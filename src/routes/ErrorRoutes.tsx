import { PageLoader } from "@/components/PageLoader";
import { NAVIGATION_PATHS } from "@/constants";
import { Suspense, lazy } from "react";

const NotFound = lazy(() => import("@/components/NotFound"));

const withLoader = (
  Component: React.LazyExoticComponent<React.ComponentType>
) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const ErrorRoutes = [
  {
    element: withLoader(NotFound),
    path: NAVIGATION_PATHS.ERROR,
  },
];

export default ErrorRoutes;
