import { lazy, Suspense } from "react";
import PublicLayout from "@/layout/PublicLayout";
import { PageLoader } from "@/components/PageLoader";
import { NAVIGATION_PATHS } from "@/constants";

// Lazy load pages
const HomePage = lazy(() => import("@/modules/recipes"));
const ProfilePage = lazy(() => import("@/modules/profile"));
const RecipeDetailsPage = lazy(() => import("@/modules/recipe-details"));

const PublicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: NAVIGATION_PATHS.HOME,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: NAVIGATION_PATHS.PROFILE,
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: NAVIGATION_PATHS.RECIPE_DETAILS,
        element: (
          <Suspense fallback={<PageLoader />}>
            <RecipeDetailsPage />
          </Suspense>
        ),
      },
    ],
  },
];

export default PublicRoutes;
