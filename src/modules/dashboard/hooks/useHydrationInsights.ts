import { useQuery } from "@tanstack/react-query";
import { getHydrationInsights } from "../api";
import { DASHBOARD_QUERY_KEYS } from "./queryKeys";

/** Hook to fetch hydration insights */
export function useHydrationInsights(
  startDate: string,
  endDate: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.hydrationInsights(startDate, endDate),
    queryFn: () => getHydrationInsights({ startDate, endDate }),
    enabled: options?.enabled ?? true,
  });
}
