import { Link, useNavigate } from "react-router-dom";
import { LoginHero } from "./components/LoginHero";
import { NAVIGATION_PATHS } from "@/constants";
import { MobileAuthHeader } from "./components/MobileAuthHeader";
import { LoginForm } from "./components/LoginForm";
import { AuthDivider } from "./components/AuthDivider";
import { useMe } from "./hooks";
import { PageLoader } from "@/components/PageLoader";
import { HabitTrackerLogo } from "@/components/sidebar/HabitTrackerLogo";

const Login = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useMe();

  if (isLoading || isFetching) {
    return <PageLoader />;
  }

  if (data?.user) {
    navigate(NAVIGATION_PATHS.DASHBOARD);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <LoginHero className="hidden lg:flex" />
      <div className="flex flex-col justify-start pt-12 pb-8 px-6 sm:px-8 sm:py-12 md:px-12 lg:justify-center lg:px-16">
        <div className="mx-auto w-full max-w-sm sm:max-w-xl">
          {/* Mobile Header */}
          <MobileAuthHeader />

          {/* Desktop Logo */}
          <div className="hidden lg:block mb-8">
            <HabitTrackerLogo isMobile showLabel />
          </div>

          {/* Form Section */}
          <div className="mt-6 lg:mt-0 space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                Welcome back
              </h2>
              <p className="text-muted-foreground text-sm">
                Sign in to continue tracking your habits
              </p>
            </div>

            <AuthDivider className="py-2" />

            <LoginForm />
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to={NAVIGATION_PATHS.REGISTER}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
