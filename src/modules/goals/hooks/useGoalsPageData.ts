import { useMemo } from "react";
import { useGoal } from "./useGoal";
import { useTodayActivities } from "./useTodayActivities";
import { useCaloriesProgress } from "./useCaloriesProgress";
import { useWaterProgress } from "./useWaterProgress";
import { useGoalAchievementTrend } from "./useGoalAchievementTrend";
import {
  ANALYTICS_RANGE_7D,
  ANALYTICS_RANGE_1M,
  ANALYTICS_UNIT_DAY,
} from "../constants";

/** Fetches goal first; when goal exists, fetches today + analytics in parallel. */
export function useGoalsPageData() {
  const goalQuery = useGoal();
  const goal = goalQuery.data?.goal ?? null;

  const todayQuery = useTodayActivities({ enabled: !!goal });
  const caloriesQuery = useCaloriesProgress(
    { range: ANALYTICS_RANGE_7D, unit: ANALYTICS_UNIT_DAY },
    { enabled: !!goal }
  );
  const waterQuery = useWaterProgress(
    { range: ANALYTICS_RANGE_7D, unit: ANALYTICS_UNIT_DAY },
    { enabled: !!goal }
  );
  const trendQuery = useGoalAchievementTrend(
    { range: ANALYTICS_RANGE_1M, unit: ANALYTICS_UNIT_DAY },
    { enabled: !!goal }
  );

  const isPending =
    goalQuery.isPending ||
    (!!goal &&
      (todayQuery.isPending ||
        caloriesQuery.isPending ||
        waterQuery.isPending ||
        trendQuery.isPending));

  const isError = goalQuery.isError;
  const error = goalQuery.error;

  const todayActivity = useMemo(() => {
    const activities = todayQuery.data?.activities;
    if (activities == null) return null;
    if (Array.isArray(activities)) return activities[0] ?? null;
    return activities;
  }, [todayQuery.data?.activities]);

  const todayKcal = todayActivity?.totalCalories ?? 0;
  const todayWaterMl = todayActivity?.totalWaterMl ?? 0;

  return {
    goal,
    isPending,
    isError,
    error,
    todayKcal,
    todayWaterMl,
    avgKcalWeek:
      caloriesQuery.data?.summary?.overallAverage != null
        ? Math.round(caloriesQuery.data.summary.overallAverage)
        : 0,
    avgWaterMlWeek:
      waterQuery.data?.summary?.overallAverage != null
        ? Math.round(waterQuery.data.summary.overallAverage)
        : 0,
    caloriesProgress: caloriesQuery.data ?? null,
    waterProgress: waterQuery.data ?? null,
    goalAchievementTrend: trendQuery.data ?? null,
    caloriesProgressError: caloriesQuery.isError ? caloriesQuery.error : null,
    waterProgressError: waterQuery.isError ? waterQuery.error : null,
    trendError: trendQuery.isError ? trendQuery.error : null,
  };
}
