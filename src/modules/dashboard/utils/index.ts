import { formatChartDay, formatChartLabel, subDaysFromToday, toISO } from "@/utils/time.utils";

/**
 * Format milliliters to display string (e.g., 2500 → "2.5L" or 500 → "500ml")
 */
export const formatMl = (ml: number): string => {
  if (ml >= 1000) {
    const liters = ml / 1000;
    return `${liters % 1 === 0 ? liters : liters.toFixed(1)}L`;
  }
  return `${Math.round(ml)}ml`;
};

/**
 * Format kilocalories to display string with comma separators
 */
export const formatKcal = (kcal: number): string => {
  return Math.round(kcal).toLocaleString();
};

/**
 * Calculate percentage progress (capped at 100 for display, actual can exceed)
 */
export const calculateProgress = (actual: number, goal: number): number => {
  if (goal <= 0) return 0;
  return Math.round((actual / goal) * 100);
};

/**
 * Calculate percentage progress capped at 100 for visual displays
 */
export const calculateProgressCapped = (actual: number, goal: number): number => {
  return Math.min(100, calculateProgress(actual, goal));
};

/** Dummy data point for charts */
export interface DummyChartPoint {
  dateObj: Date;
  label: string;
  fullDate: string;
  calories: number;
  caloriesGoal: number;
  water: number;
  waterGoal: number;
}

/**
 * Generate dummy chart data for a given number of days
 */
export const getDummyChartData = (
  days: number,
  caloriesGoal: number,
  waterGoalMl: number
): DummyChartPoint[] => {
  const data: DummyChartPoint[] = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const dateObj = subDaysFromToday(i).toDate();
    const variance = 0.6 + Math.random() * 0.6; // 60-120% of goal
    
    data.push({
      dateObj,
      label: formatChartDay(dateObj),
      fullDate: formatChartLabel(dateObj),
      calories: Math.round(caloriesGoal * variance),
      caloriesGoal,
      water: Math.round(waterGoalMl * variance),
      waterGoal: waterGoalMl,
    });
  }
  
  return data;
};

/**
 * Get date range for preset
 */
export const getDateRangeForPreset = (preset: string): { from: string; to: string } => {
  const today = toISO(new Date());
  
  switch (preset) {
    case "7d":
      return {
        from: toISO(subDaysFromToday(6)),
        to: today,
      };
    case "30d":
      return {
        from: toISO(subDaysFromToday(29)),
        to: today,
      };
    default: // today
      return {
        from: today,
        to: today,
      };
  }
};
