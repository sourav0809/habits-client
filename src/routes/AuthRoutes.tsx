import AuthLayout from "@/layout/AuthLayout";
import { GuestGuard } from "@/routes/guard/guestGuard";
import { NAVIGATION_PATHS } from "@/constants";
import { Suspense, lazy } from "react";
import { PageLoader } from "@/components/PageLoader";

const Login = lazy(() => import("@/modules/auth/Login"));
const Register = lazy(() => import("@/modules/auth/Register"));

const withLoader = (
  Component: React.LazyExoticComponent<React.ComponentType>
) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const AuthRoutes = [
  {
    element: <GuestGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: NAVIGATION_PATHS.LOGIN,
            element: withLoader(Login),
          },
          {
            path: NAVIGATION_PATHS.REGISTER,
            element: withLoader(Register),
          },
        ],
      },
    ],
  },
];

export default AuthRoutes;
