import { useQuery } from "@tanstack/react-query";
import { getWaterOverTime } from "../api";
import { DASHBOARD_QUERY_KEYS } from "./queryKeys";

/** Hook to fetch water over time for chart */
export function useWaterOverTime(
  startDate: string,
  endDate: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.waterOverTime(startDate, endDate),
    queryFn: () => getWaterOverTime({ startDate, endDate }),
    enabled: options?.enabled ?? true,
  });
}
