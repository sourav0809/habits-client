import { useQuery } from "@tanstack/react-query";
import { getCaloriesOverTime } from "../api";
import { DASHBOARD_QUERY_KEYS } from "./queryKeys";

/** Hook to fetch calories over time for chart */
export function useCaloriesOverTime(
  startDate: string,
  endDate: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.caloriesOverTime(startDate, endDate),
    queryFn: () => getCaloriesOverTime({ startDate, endDate }),
    enabled: options?.enabled ?? true,
  });
}
