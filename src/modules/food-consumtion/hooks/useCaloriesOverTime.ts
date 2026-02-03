import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { getCaloriesOverTime } from "../api";
import type {
  CaloriesOverTimeQuery,
  CaloriesOverTimeResponse,
} from "../types";

/**
 * Fetches calories over time (stats + chart data) for the given date range.
 * Uses startDate and endDate only.
 */
export function useCaloriesOverTime(startDate: string, endDate: string) {
  return useQuery<CaloriesOverTimeResponse>({
    queryKey: QUERY_KEYS.foodConsumption.caloriesOverTime(startDate, endDate),
    queryFn: () =>
      getCaloriesOverTime({
        startDate,
        endDate,
      } as CaloriesOverTimeQuery),
  });
}
