import { AuthGuard } from "@/routes/guard/authGuard";
import Dashboard from "@/pages/Dashboard";
import { NAVIGATION_PATHS } from "@/constants";
import AuthLayout from "@/layout/AuthLayout";

const PrivateRoutes = [
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: NAVIGATION_PATHS.DASHBOARD,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
];

export default PrivateRoutes;
