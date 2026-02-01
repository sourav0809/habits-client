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
};
