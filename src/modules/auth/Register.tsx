import { Link, useNavigate } from "react-router-dom";
import { NAVIGATION_PATHS } from "@/constants";
import { LoginHero } from "./components/LoginHero";
import { MobileAuthHeader } from "./components/MobileAuthHeader";
import { RegisterForm } from "./components/RegisterForm";
import { AuthDivider } from "./components/AuthDivider";
import { PageLoader } from "@/components/PageLoader";
import { useMe } from "./hooks";
import { HabitTrackerLogo } from "@/components/sidebar/HabitTrackerLogo";

const Register = () => {
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
      <div className="flex flex-col justify-start pt-12 pb-8 px-6 sm:px-8 sm:py-12 md:px-12 lg:justify-center lg:px-16 xl:px-20">
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
                Create an account
              </h2>
              <p className="text-muted-foreground text-sm">
                Start your habit tracking journey today
              </p>
            </div>

            <AuthDivider className="py-2" />

            <RegisterForm />
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to={NAVIGATION_PATHS.LOGIN}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
