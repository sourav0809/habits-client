import { useQuery } from "@tanstack/react-query";
import { getHydrationInsights } from "../api";
import type {
  HydrationInsightsQuery,
  HydrationInsightsResponse,
} from "../types";
import { WATER_QUERY_KEYS } from "../constants";

/**
 * Fetches hydration insights for the given date range.
 * Uses startDate and endDate only (no range/unit).
 */
export function useHydrationInsights(startDate: string, endDate: string) {
  return useQuery<HydrationInsightsResponse>({
    queryKey: WATER_QUERY_KEYS.hydrationInsights(startDate, endDate),
    queryFn: () =>
      getHydrationInsights({
        startDate,
        endDate,
      } as HydrationInsightsQuery),
  });
}
