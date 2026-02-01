import { Link, useNavigate } from "react-router-dom";
import { LoginHero } from "./components/LoginHero";
import { NAVIGATION_PATHS } from "@/constants";
import { MobileAuthHeader } from "./components/MobileAuthHeader";
import { LoginForm } from "./components/LoginForm";
import { useMe } from "./hooks";
import { PageLoader } from "@/components/PageLoader";

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
      <div className="flex flex-col justify-start px-4 py-8 sm:px-6 sm:py-10 md:justify-center md:px-8 md:py-12 lg:items-start lg:px-10 lg:py-16 xl:px-16">
        <div className="w-full max-w-full text-left sm:max-w-md md:max-w-lg md:space-y-6 lg:max-w-xl lg:space-y-8">
          <MobileAuthHeader />
          <div className="mt-6 space-y-5 md:mt-8 md:space-y-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back
            </h2>
            <LoginForm />
          </div>
          <p className="mt-6 text-left text-sm text-muted-foreground md:mt-8">
            Don&apos;t have an account?{" "}
            <Link
              to={NAVIGATION_PATHS.REGISTER}
              className="font-medium text-primary underline-offset-4 hover:underline"
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
