import AuthLayout from "@/layout/AuthLayout";
import Login from "@/modules/auth/Login";
import Register from "@/modules/auth/Register";
import { NAVIGATION_PATHS } from "@/constants";

const AuthRoutes = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: NAVIGATION_PATHS.LOGIN,
        element: <Login />,
      },
      {
        path: NAVIGATION_PATHS.REGISTER,
        element: <Register />,
      },
    ],
  },
];

export default AuthRoutes;
