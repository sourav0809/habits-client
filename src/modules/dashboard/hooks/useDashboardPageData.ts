import { useMemo } from "react";
import { useGoal, normalizeGoal } from "./useGoal";
import { useTodayActivities } from "./useTodayActivities";
import { useCaloriesOverTime } from "./useCaloriesOverTime";
import { useWaterOverTime } from "./useWaterOverTime";
import { useHydrationInsights } from "./useHydrationInsights";
import { calculateProgress } from "../utils";
import type { TodayActivity } from "@/modules/goals/types";

export interface UseDashboardPageDataOptions {
  startDate: string;
  endDate: string;
}

/**
 * Main dashboard data hook - fetches all data needed for dashboard
 * Follows same pattern as useGoalsPageData
 */
export function useDashboardPageData({ startDate, endDate }: UseDashboardPageDataOptions) {
  const goalQuery = useGoal();
  const goal = normalizeGoal(goalQuery.data);
  const hasGoal = !!goal;

  const todayQuery = useTodayActivities({ enabled: hasGoal });
  const caloriesQuery = useCaloriesOverTime(startDate, endDate, { enabled: hasGoal });
  const waterQuery = useWaterOverTime(startDate, endDate, { enabled: hasGoal });
  const insightsQuery = useHydrationInsights(startDate, endDate, { enabled: hasGoal });

  const todayActivity = useMemo((): TodayActivity | null => {
    const activities = todayQuery.data?.activities;
    if (activities == null) return null;
    if (Array.isArray(activities)) return activities[0] ?? null;
    return activities;
  }, [todayQuery.data?.activities]);

  const todaySummary = useMemo(() => {
    const caloriesConsumed = todayActivity?.totalCalories ?? 0;
    const waterConsumedMl = todayActivity?.totalWaterMl ?? 0;
    const caloriesGoal = goal?.targetCalories ?? 0;
    const waterGoalMl = goal?.targetWaterMl ?? 0;

    return {
      caloriesConsumed,
      caloriesGoal,
      caloriesPercent: calculateProgress(caloriesConsumed, caloriesGoal),
      waterConsumedMl,
      waterGoalMl,
      waterPercent: calculateProgress(waterConsumedMl, waterGoalMl),
    };
  }, [todayActivity, goal]);

  const isPending =
    goalQuery.isPending ||
    (hasGoal && (todayQuery.isPending || caloriesQuery.isPending || waterQuery.isPending || insightsQuery.isPending));

  const isError = goalQuery.isError;
  const error = goalQuery.error;

  return {
    goal,
    hasGoal,
    todaySummary,
    todayActivity,
    caloriesData: caloriesQuery.data ?? null,
    waterData: waterQuery.data ?? null,
    insights: insightsQuery.data ?? null,
    isPending,
    isError,
    error,
    caloriesLoading: caloriesQuery.isPending,
    waterLoading: waterQuery.isPending,
    insightsLoading: insightsQuery.isPending,
  };
}
