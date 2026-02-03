import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { getHydrationInsights } from "../api";

/** Hook to fetch hydration insights */
export function useHydrationInsights(
  startDate: string,
  endDate: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.hydrationInsights(startDate, endDate),
    queryFn: () => getHydrationInsights({ startDate, endDate }),
    enabled: options?.enabled ?? true,
  });
}
