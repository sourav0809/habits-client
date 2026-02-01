import { Navigate } from "react-router-dom";
import PublicLayout from "@/layout/PublicLayout";
import { NAVIGATION_PATHS } from "@/constants";

const PublicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={NAVIGATION_PATHS.LOGIN} replace />,
      },
    ],
  },
];

export default PublicRoutes;
