import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { getCaloriesOverTime } from "../api";

/** Hook to fetch calories over time for chart */
export function useCaloriesOverTime(
  startDate: string,
  endDate: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.caloriesOverTime(startDate, endDate),
    queryFn: () => getCaloriesOverTime({ startDate, endDate }),
    enabled: options?.enabled ?? true,
  });
}
