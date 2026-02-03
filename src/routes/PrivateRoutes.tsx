import { lazy, Suspense } from "react";
import { AuthGuard } from "@/routes/guard/authGuard";
import { NAVIGATION_PATHS } from "@/constants";
import PrivateLayout from "@/layout/PrivateLayout";
import { PageLoader } from "@/components/PageLoader";

const Dashboard = lazy(() => import("@/modules/dashboard"));
const FoodLog = lazy(() => import("@/modules/food-consumtion"));
const MyMeals = lazy(() => import("@/modules/my-meals"));
const WaterLog = lazy(() => import("@/modules/water"));
const Goals = lazy(() => import("@/modules/goals"));

const withLoader = (
  Component: React.LazyExoticComponent<React.ComponentType>
) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const PrivateRoutes = [
  {
    element: <AuthGuard />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          { path: NAVIGATION_PATHS.DASHBOARD, element: withLoader(Dashboard) },
          { path: NAVIGATION_PATHS.FOOD_LOG, element: withLoader(FoodLog) },
          { path: NAVIGATION_PATHS.WATER_LOG, element: withLoader(WaterLog) },
          { path: NAVIGATION_PATHS.GOALS, element: withLoader(Goals) },
          { path: NAVIGATION_PATHS.YOUR_MEALS, element: withLoader(MyMeals) },
        ],
      },
    ],
  },
];

export default PrivateRoutes;
