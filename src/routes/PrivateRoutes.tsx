import { AuthGuard } from "@/routes/guard/authGuard";
import { NAVIGATION_PATHS } from "@/constants";
import PrivateLayout from "@/layout/PrivateLayout";
import FoodLog from "@/modules/food";
import MyMeals from "@/modules/my-meals";



const PrivateRoutes = [
  {
    element: <AuthGuard />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          { path: NAVIGATION_PATHS.DASHBOARD, element: <></> },
          { path: NAVIGATION_PATHS.FOOD_LOG, element: <FoodLog /> },
          { path: NAVIGATION_PATHS.WATER_LOG, element: <></> },
          { path: NAVIGATION_PATHS.GOALS, element: <></> },
          { path: NAVIGATION_PATHS.YOUR_MEALS, element: <MyMeals /> },
        ],
      },
    ],
  },
];

export default PrivateRoutes;
