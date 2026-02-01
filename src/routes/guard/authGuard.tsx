import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PageLoader } from "@/components/PageLoader";
import { useMe } from "@/modules/auth/hooks";
import { getAuthToken } from "@/utils";
import { NAVIGATION_PATHS } from "@/constants";

/**
 * Protects private routes: ensures a valid token and fetches current user
 * before rendering children. Shows loader while fetching; redirects to
 * login if no token or if /me fails.
 */
export function AuthGuard() {
  const navigate = useNavigate();
  const hasToken = !!getAuthToken();
  const { data, isLoading, isError, isFetching } = useMe(hasToken);

  useEffect(() => {
    if (!hasToken) {
      navigate(NAVIGATION_PATHS.LOGIN, { replace: true });
      return;
    }
    if (!isLoading && !isFetching && (isError || !data)) {
      navigate(NAVIGATION_PATHS.LOGIN, { replace: true });
    }
  }, [hasToken, isLoading, isFetching, isError, data, navigate]);

  if (!hasToken) {
    return <PageLoader />;
  }

  if (isLoading || isFetching || isError || !data) {
    return <PageLoader />;
  }

  return <Outlet />;
}
