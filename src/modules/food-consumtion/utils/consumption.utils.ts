import moment from "moment-timezone";
import { getDaysInRange } from "@/utils/time.utils";
import { formatDateLabel, toISO } from "./date.utils";
import type { FoodConsumption } from "../types";
import type { CaloriesOverTimePoint } from "../types";
import {
  getCurrentDateAsDate,
  getCurrentTimeString,
  getTimeStringFromISO,
  parseDateTimeToDate,
} from "./date.utils";

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

/**
 * Calculate pagination pages with ellipsis
 */
export function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  if (totalPages <= 0) return [];
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "ellipsis")[] = [1];
  const windowStart = Math.max(2, currentPage - 1);
  const windowEnd = Math.min(totalPages - 1, currentPage + 1);

  if (windowStart > 2) pages.push("ellipsis");
  for (let p = windowStart; p <= windowEnd; p++) {
    if (p !== 1 && p !== totalPages) pages.push(p);
  }
  if (windowEnd < totalPages - 1) pages.push("ellipsis");
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

/**
 * Format date range for display
 */
export function formatDateRangeLabel(
  dateRange: { from?: Date; to?: Date } | undefined
): string {
  return dateRange?.from && dateRange?.to
    ? dateRange.from.getTime() === dateRange.to.getTime()
      ? formatDateLabel(toISO(dateRange.from))
      : `${formatDateLabel(toISO(dateRange.from))} – ${formatDateLabel(
          toISO(dateRange.to)
        )}`
    : "Pick dates";
}

/**
 * Safely extract food ID from consumption (handles both populated object and IO format)
 */
export function getResolvedFoodId(c: FoodConsumption): string {
  const u = c.userFoodId;
  return typeof u === "object" && u !== null ? u.id : u ?? "";
}

/**
 * Extract initial date/time for consumption editing
 */
export function getInitialDateAndTime(c: FoodConsumption): {
  date: Date;
  time: string;
} {
  const iso = c.dateAndTime ?? c.date ?? "";
  if (!iso) {
    return {
      date: getCurrentDateAsDate(),
      time: getCurrentTimeString(),
    };
  }
  return {
    date: parseDateTimeToDate(iso),
    time: getTimeStringFromISO(iso),
  };
}
