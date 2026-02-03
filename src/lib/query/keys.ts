// Query keys for React Query
export const QUERY_KEYS = {
  categories: ["categories"] as const,
  searchRecipes: (query: string) => ["recipes", "search", query] as const,
  filterByCategory: (category: string) =>
    ["recipes", "category", category] as const,
  defaultRecipes: ["recipes", "default"] as const,
  recipeDetails: (id: string) => ["recipes", "details", id] as const,
  auth: {
    me: ["auth", "me"] as const,
  },
  food: {
    list: ["food", "list"] as const,
  },
  foodConsumption: {
    list: (
      startDate: string,
      endDate: string,
      page: number,
      limit: number
    ) => ["food", "consumption", startDate, endDate, page, limit] as const,
    caloriesOverTime: (startDate: string, endDate: string) =>
      ["food", "caloriesOverTime", startDate, endDate] as const,
    detail: (id: string) => ["food", "consumption", "detail", id] as const,
  },
  dashboard: {
    goal: ["dashboard", "goal"] as const,
    todayActivities: ["dashboard", "today-activities"] as const,
    caloriesOverTime: (startDate: string, endDate: string) =>
      ["dashboard", "calories-over-time", startDate, endDate] as const,
    waterOverTime: (startDate: string, endDate: string) =>
      ["dashboard", "water-over-time", startDate, endDate] as const,
    hydrationInsights: (startDate: string, endDate: string) =>
      ["dashboard", "hydration-insights", startDate, endDate] as const,
  },
  goals: {
    goal: ["user", "goals"] as const,
    todayActivities: ["user", "activities", "today"] as const,
    analytics: {
      caloriesProgress: (range: string, unit: string) =>
        ["user", "analytics", "calories-progress", range, unit] as const,
      waterProgress: (range: string, unit: string) =>
        ["user", "analytics", "water-progress", range, unit] as const,
      goalAchievementTrend: (range: string, unit: string) =>
        ["user", "analytics", "goal-achievement-trend", range, unit] as const,
    },
  },
};
