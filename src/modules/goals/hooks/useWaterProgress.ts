import { useQuery } from "@tanstack/react-query";
import { getWaterProgress } from "../api";
import type {
  AnalyticsQueryParams,
  WaterProgressResponse,
} from "../types";
import { ANALYTICS_QUERY_KEYS } from "../constants";

const DEFAULT_PARAMS: AnalyticsQueryParams = {
  range: "7d",
  unit: "day",
};

export function useWaterProgress(
  params?: AnalyticsQueryParams,
  options?: { enabled?: boolean }
) {
  const range = params?.range ?? DEFAULT_PARAMS.range ?? "7d";
  const unit = params?.unit ?? DEFAULT_PARAMS.unit ?? "day";

  return useQuery<WaterProgressResponse>({
    queryKey: ANALYTICS_QUERY_KEYS.waterProgress(range, unit),
    queryFn: () => getWaterProgress({ range, unit }),
    enabled: options?.enabled ?? true,
  });
}
