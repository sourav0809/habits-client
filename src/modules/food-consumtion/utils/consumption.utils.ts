import type { FoodConsumption } from "../types";

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
  formatDateLabel: (iso: string) => string,
  toISO: (d: Date) => string
): ChartDataPoint[] {
  const byDay: Record<string, number> = {};
  const start = new Date(dateFrom + "T12:00:00");
  const end = new Date(dateTo + "T12:00:00");
  const startTime = start.getTime();
  const endTime = end.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  for (let t = startTime; t <= endTime; t += oneDay) {
    const d = new Date(t);
    byDay[toISO(d)] = 0;
  }
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
