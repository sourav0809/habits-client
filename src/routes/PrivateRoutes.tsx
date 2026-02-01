import { AuthGuard } from "@/routes/guard/authGuard";
import Dashboard from "@/pages/Dashboard";
import FoodLog from "@/pages/FoodLog";
import WaterLog from "@/pages/WaterLog";
import Goals from "@/pages/Goals";
import { NAVIGATION_PATHS } from "@/constants";
import PrivateLayout from "@/layout/PrivateLayout";

const PrivateRoutes = [
  {
    element: <AuthGuard />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          { path: NAVIGATION_PATHS.DASHBOARD, element: <Dashboard /> },
          { path: NAVIGATION_PATHS.FOOD_LOG, element: <FoodLog /> },
          { path: NAVIGATION_PATHS.WATER_LOG, element: <WaterLog /> },
          { path: NAVIGATION_PATHS.GOALS, element: <Goals /> },
        ],
      },
    ],
  },
];

export default PrivateRoutes;
