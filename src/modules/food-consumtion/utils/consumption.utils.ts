import moment from "moment-timezone";
import { getDaysInRange } from "@/utils/time.utils";
import { formatDateLabel } from "./date.utils";
import type { FoodConsumption } from "../types";
import type { CaloriesOverTimePoint } from "../types";

/** Format API period string for chart axis (day: "Mon, Jan 1", month: "Feb 2025", year: "2025") */
export function formatPeriodLabel(period: string): string {
  if (!period) return period;
  if (period.length === 10) return formatDateLabel(period);
  if (period.length === 7) {
    const m = moment(`${period}-01`);
    return m.isValid() ? m.format("MMM YYYY") : period;
  }
  return period;
}

/** Map calories-over-time API response to chart data (handles long ranges / gaps) */
export function mapCaloriesOverTimeToChartData(
  caloriesOverTime: CaloriesOverTimePoint[]
): ChartDataPoint[] {
  return caloriesOverTime.map(({ period, calories }) => ({
    date: period,
    label: formatPeriodLabel(period),
    kcal: calories,
  }));
}

export interface ConsumptionStats {
  totalKcal: number;
  mealCount: number;
  avgPerMeal: number;
}

/** Compute stats from filtered consumptions */
export function getConsumptionStats(
  consumptions: FoodConsumption[]
): ConsumptionStats {
  const totalKcal = consumptions.reduce((s, c) => s + c.totalCalories, 0);
  const mealCount = consumptions.length;
  const avgPerMeal = mealCount > 0 ? Math.round(totalKcal / mealCount) : 0;
  return { totalKcal, mealCount, avgPerMeal };
}

/** Get display name from consumption (list returns populated userFoodId) */
export function getConsumptionFoodName(c: FoodConsumption): string {
  const u = c.userFoodId;
  return typeof u === "object" && u !== null ? u.name : "—";
}

/** Chart data point for calories over time */
export interface ChartDataPoint {
  date: string;
  label: string;
  kcal: number;
}

/** Build chart data from consumptions and date range */
export function getConsumptionChartData(
  consumptions: FoodConsumption[],
  dateFrom: string,
  dateTo: string,
  formatDateLabel: (iso: string) => string
): ChartDataPoint[] {
  const days = getDaysInRange(dateFrom, dateTo);
  const byDay: Record<string, number> = {};
  days.forEach((d) => {
    byDay[d] = 0;
  });
  const getDatePart = (iso: string) => iso.slice(0, 10);
  consumptions.forEach((c) => {
    const dateTime = c.dateAndTime ?? (c as { date?: string }).date ?? "";
    const day = getDatePart(dateTime);
    if (day) byDay[day] = (byDay[day] ?? 0) + c.totalCalories;
  });
  return Object.entries(byDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, kcal]) => ({
      date,
      label: formatDateLabel(date),
      kcal,
    }));
}
