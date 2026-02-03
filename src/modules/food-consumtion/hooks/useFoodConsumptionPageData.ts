import { useMemo } from "react";
import { useFoodConsumptions } from "./useFoodConsumptions";
import { useCaloriesOverTime } from "./useCaloriesOverTime";
import { mapCaloriesOverTimeToChartData } from "../utils";
import type { ConsumptionStats } from "../utils";
import { FOOD_CONSUMPTIONS_PAGE_LIMIT } from "../constants";

/**
 * Fetches food page data in parallel: paginated consumptions + calories over time (stats + chart).
 * Stats and chart come from calories-over-time API; table uses paginated list.
 */
export function useFoodConsumptionPageData(
  dateFrom: string,
  dateTo: string,
  page: number = 1,
  limit: number = FOOD_CONSUMPTIONS_PAGE_LIMIT
) {
  const listQuery = useFoodConsumptions({
    startDate: dateFrom,
    endDate: dateTo,
    page,
    limit,
  });
  const analyticsQuery = useCaloriesOverTime(dateFrom, dateTo);

  const consumptions = useMemo(
    () => listQuery.data?.consumptions ?? [],
    [listQuery.data?.consumptions]
  );
  const pagination = useMemo(() => {
    const p = listQuery.data?.pagination;
    if (p) return p;
    if (consumptions.length === 0)
      return { page: 1, limit, totalEntries: 0, totalPages: 0 };
    return {
      page: 1,
      limit: consumptions.length,
      totalEntries: consumptions.length,
      totalPages: 1,
    };
  }, [listQuery.data?.pagination, consumptions.length, limit]);

  const stats: ConsumptionStats = useMemo(() => {
    const d = analyticsQuery.data;
    if (!d)
      return { totalKcal: 0, mealCount: 0, avgPerMeal: 0 };
    return {
      totalKcal: d.calories,
      mealCount: d.mealsLogged,
      avgPerMeal:
        d.mealsLogged > 0
          ? Math.round(d.avgCaloriesPerMeal)
          : 0,
    };
  }, [analyticsQuery.data]);

  const chartData = useMemo(() => {
    const points = analyticsQuery.data?.caloriesOverTime ?? [];
    return mapCaloriesOverTimeToChartData(points);
  }, [analyticsQuery.data?.caloriesOverTime]);

  const isPending = listQuery.isPending || analyticsQuery.isPending;
  const isError = listQuery.isError || analyticsQuery.isError;
  const error = listQuery.error ?? analyticsQuery.error;

  return {
    consumptions,
    pagination,
    stats,
    chartData,
    isPending,
    isError,
    error,
  };
}
