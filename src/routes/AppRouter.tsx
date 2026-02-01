import { createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import PrivateRoutes from "./PrivateRoutes";
import ErrorRoutes from "./ErrorRoutes";
import { NAVIGATION_PATHS } from "@/constants";

const AppRouter = createBrowserRouter([
  {
    path: NAVIGATION_PATHS.HOME,
    children: [
      ...PublicRoutes,
      ...AuthRoutes,
      ...PrivateRoutes,
      ...ErrorRoutes,
    ],
  },
]);

export default AppRouter;
