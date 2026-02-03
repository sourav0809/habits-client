import type { DateRange } from "react-day-picker";
import type { Goal, TodayActivity } from "@/modules/goals/types";
import type { HydrationInsightsResponse } from "@/modules/water/types";
import type { CaloriesOverTimeResponse, CaloriesOverTimePoint } from "@/modules/food-consumtion/types";

/** Dashboard date range filter state */
export interface DashboardDateRange {
  from: string; // ISO date string
  to: string;   // ISO date string
}

/** Today's summary stats for dashboard */
export interface DashboardTodaySummary {
  caloriesConsumed: number;
  caloriesGoal: number;
  caloriesPercent: number;
  waterConsumedMl: number;
  waterGoalMl: number;
  waterPercent: number;
}

/** Dashboard chart data point */
export interface DashboardChartPoint {
  label: string;
  fullDate: string;
  actual: number;
  goal: number;
}

/** Props for date range section */
export interface DateRangeSectionProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  calendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
}

// ---------------------------------------------------------------------------
// Water Over Time API Types
// ---------------------------------------------------------------------------

/** GET water-over-time – query params */
export interface WaterOverTimeQuery {
  startDate?: string;
  endDate?: string;
  range?: string;
  unit?: "day" | "month" | "year";
}

/** One data point for water-over-time chart */
export interface WaterOverTimePoint {
  period: string;
  waterMl: number;
}

/** GET water-over-time – response shape */
export interface WaterOverTimeResponse {
  waterOverTime: WaterOverTimePoint[];
  totalWaterMl: number;
  logsLogged: number;
  avgWaterPerLog: number;
}

/** Re-export types from other modules for convenience */
export type { Goal, TodayActivity, HydrationInsightsResponse, CaloriesOverTimeResponse, CaloriesOverTimePoint };
