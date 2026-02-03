/** Query keys for dashboard data */
export const DASHBOARD_QUERY_KEYS = {
  goal: ["dashboard", "goal"] as const,
  todayActivities: ["dashboard", "today-activities"] as const,
  caloriesOverTime: (startDate: string, endDate: string) =>
    ["dashboard", "calories-over-time", startDate, endDate] as const,
  waterOverTime: (startDate: string, endDate: string) =>
    ["dashboard", "water-over-time", startDate, endDate] as const,
  hydrationInsights: (startDate: string, endDate: string) =>
    ["dashboard", "hydration-insights", startDate, endDate] as const,
};
