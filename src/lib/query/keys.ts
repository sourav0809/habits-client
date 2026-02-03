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
};
