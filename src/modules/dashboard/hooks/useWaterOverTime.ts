import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { getWaterOverTime } from "../api";

/** Hook to fetch water over time for chart */
export function useWaterOverTime(
  startDate: string,
  endDate: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.waterOverTime(startDate, endDate),
    queryFn: () => getWaterOverTime({ startDate, endDate }),
    enabled: options?.enabled ?? true,
  });
}
