import { createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import ErrorRoutes from "./ErrorRoutes";
import { NAVIGATION_PATHS } from "@/constants";

const AppRouter = createBrowserRouter([
  {
    path: NAVIGATION_PATHS.HOME,
    children: [...PublicRoutes, ...AuthRoutes, ...ErrorRoutes],
  },
]);

export default AppRouter;
