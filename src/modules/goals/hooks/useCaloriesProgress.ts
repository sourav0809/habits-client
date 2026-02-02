import { useQuery } from "@tanstack/react-query";
import { getCaloriesProgress } from "../api";
import type {
  AnalyticsQueryParams,
  CaloriesProgressResponse,
} from "../types";
import { ANALYTICS_QUERY_KEYS } from "../constants";

const DEFAULT_PARAMS: AnalyticsQueryParams = {
  range: "7d",
  unit: "day",
};

export function useCaloriesProgress(
  params?: AnalyticsQueryParams,
  options?: { enabled?: boolean }
) {
  const range = params?.range ?? DEFAULT_PARAMS.range ?? "7d";
  const unit = params?.unit ?? DEFAULT_PARAMS.unit ?? "day";

  return useQuery<CaloriesProgressResponse>({
    queryKey: ANALYTICS_QUERY_KEYS.caloriesProgress(range, unit),
    queryFn: () => getCaloriesProgress({ range, unit }),
    enabled: options?.enabled ?? true,
  });
}
