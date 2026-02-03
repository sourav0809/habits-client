import { useQuery } from "@tanstack/react-query";
import { getGoalAchievementTrend } from "../api";
import type {
  AnalyticsQueryParams,
  GoalAchievementTrendResponse,
} from "../types";
import { QUERY_KEYS } from "@/lib/query/keys";

const DEFAULT_PARAMS: AnalyticsQueryParams = {
  range: "1m",
  unit: "day",
};

export function useGoalAchievementTrend(
  params?: AnalyticsQueryParams,
  options?: { enabled?: boolean }
) {
  const range = params?.range ?? DEFAULT_PARAMS.range ?? "1m";
  const unit = params?.unit ?? DEFAULT_PARAMS.unit ?? "day";

  return useQuery<GoalAchievementTrendResponse>({
    queryKey: QUERY_KEYS.goals.analytics.goalAchievementTrend(range, unit),
    queryFn: () => getGoalAchievementTrend({ range, unit }),
    enabled: options?.enabled ?? true,
  });
}
