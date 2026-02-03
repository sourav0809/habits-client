/** Date range preset values for dashboard filter */
export const DATE_RANGE_PRESETS = {
  TODAY: "today",
  LAST_7_DAYS: "7d",
  LAST_30_DAYS: "30d",
} as const;

/** Labels for date range presets */
export const DATE_RANGE_LABELS: Record<string, string> = {
  [DATE_RANGE_PRESETS.TODAY]: "Today",
  [DATE_RANGE_PRESETS.LAST_7_DAYS]: "Last 7 days",
  [DATE_RANGE_PRESETS.LAST_30_DAYS]: "Last 30 days",
};

/** Chart colors - consistent with existing modules */
export const CHART_COLORS = {
  calories: {
    primary: "#3b82f6", // blue-500
    gradient: ["#3b82f6", "#1d4ed8"],
  },
  water: {
    primary: "#06b6d4", // cyan-500
    gradient: ["#06b6d4", "#0891b2"],
  },
  goal: "#f59e0b", // amber-500
  success: "#10b981", // emerald-500
} as const;

/** Analytics query parameters */
export const ANALYTICS_RANGE_7D = "7d";
export const ANALYTICS_RANGE_30D = "30d";
export const ANALYTICS_UNIT_DAY = "day";
