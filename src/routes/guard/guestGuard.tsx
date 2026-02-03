import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PageLoader } from "@/components/PageLoader";
import { useMe } from "@/modules/auth/hooks";
import { getAuthToken } from "@/utils";
import { NAVIGATION_PATHS } from "@/constants";

/**
 * Protects auth routes (login/register): if user is already logged in
 * (valid token and /me succeeds), redirects to dashboard. Otherwise
 * renders children (login/register).
 */
export function GuestGuard() {
  const navigate = useNavigate();
  const hasToken = !!getAuthToken();
  const { data, isLoading, isError, isFetching } = useMe(hasToken);

  const isAuthenticated = hasToken && !isError && !!data;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(NAVIGATION_PATHS.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!hasToken) return <Outlet />;
  if (!isLoading && !isFetching && (isError || !data)) return <Outlet />;
  return <PageLoader />;
}
