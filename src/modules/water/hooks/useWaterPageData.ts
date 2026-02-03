import { useMemo } from "react";
import { useWaterLogs, useWaterLogsForChart } from "./useWaterLogs";
import { useGoal, useTodayActivities } from "@/modules/goals/hooks";
import { getWaterChartData, formatDateLabel } from "../utils";
import { DAILY_GOAL_ML, WATER_LOGS_PAGE_LIMIT } from "../constants";
import type { WaterStats } from "../utils";

export interface UseWaterPageDataParams {
  dateFrom: string;
  dateTo: string;
  page?: number;
  limit?: number;
}

/**
 * Fetches water page data: paginated logs (with summary from API), chart data, goal, today's activity.
 * Stats (total ml, log count, avg per log) come from API summary, not client-side calculation.
 */
export function useWaterPageData(
  dateFrom: string,
  dateTo: string,
  page: number = 1,
  limit: number = WATER_LOGS_PAGE_LIMIT
) {
  const waterLogsQuery = useWaterLogs({
    startDate: dateFrom,
    endDate: dateTo,
    page,
    limit,
  });
  const chartLogsQuery = useWaterLogsForChart(dateFrom, dateTo);
  const goalQuery = useGoal();
  const goal = goalQuery.data?.goal ?? null;
  const todayQuery = useTodayActivities({ enabled: !!goal });

  const logs = useMemo(
    () => waterLogsQuery.data?.logs ?? [],
    [waterLogsQuery.data?.logs]
  );
  const pagination = waterLogsQuery.data?.pagination ?? null;
  const summary = waterLogsQuery.data?.summary;

  const stats: WaterStats = useMemo(() => {
    if (!summary || !pagination)
      return { totalMl: 0, logCount: 0, avgPerLog: 0 };
    return {
      totalMl: summary.totalWaterMl,
      logCount: pagination.totalEntries,
      avgPerLog: Math.round(summary.averagePerLog),
    };
  }, [summary, pagination]);

  const chartLogs = useMemo(
    () => chartLogsQuery.data?.logs ?? [],
    [chartLogsQuery.data?.logs]
  );

  const chartData = useMemo(
    () =>
      getWaterChartData(
        chartLogs,
        dateFrom,
        dateTo,
        goal?.targetWaterMl ?? DAILY_GOAL_ML,
        formatDateLabel
      ),
    [chartLogs, dateFrom, dateTo, goal?.targetWaterMl]
  );

  const todayActivity = useMemo(() => {
    const activities = todayQuery.data?.activities;
    if (activities == null) return null;
    return Array.isArray(activities) ? activities[0] ?? null : activities;
  }, [todayQuery.data?.activities]);

  const todayWaterMl = todayActivity?.totalWaterMl ?? 0;

  const goalCardLoading =
    goalQuery.isPending || (!!goal && todayQuery.isPending);

  const isPending = waterLogsQuery.isPending;
  const isError = waterLogsQuery.isError;
  const error = waterLogsQuery.error;

  return {
    logs,
    stats,
    chartData,
    pagination,
    goal,
    todayWaterMl,
    goalCardLoading,
    isPending,
    isError,
    error,
  };
}
