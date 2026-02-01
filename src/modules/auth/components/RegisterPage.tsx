import { Link } from "react-router-dom";
import { LoginHero } from "./LoginHero";
import { MobileAuthHeader } from "./MobileAuthHeader";
import { RegisterForm } from "./RegisterForm";
import { NAVIGATION_PATHS } from "@/constants";

export function RegisterPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <LoginHero className="hidden lg:flex" />
      <div className="flex flex-col justify-center px-6 py-10 sm:py-12 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-sm space-y-6 text-center lg:space-y-8 lg:text-left">
          <MobileAuthHeader />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Create an account
            </h2>
            <RegisterForm />
          </div>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to={NAVIGATION_PATHS.LOGIN}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
