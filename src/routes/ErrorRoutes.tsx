import NotFound from "@/components/NotFound";
import { NAVIGATION_PATHS } from "@/constants";

const ErrorRoutes = [
  {
    element: <NotFound />,
    path: NAVIGATION_PATHS.ERROR,
  },
];

export default ErrorRoutes;
