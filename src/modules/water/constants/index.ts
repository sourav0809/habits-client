/** Default daily water goal in ml */
export const DAILY_GOAL_ML = 2500;

/** Default page size for water logs list */
export const WATER_LOGS_PAGE_LIMIT = 20;

/** Max logs to fetch for chart (daily aggregation over range) */
export const WATER_CHART_LOGS_LIMIT = 500;

/** Query keys for water – used in hooks (module-scoped to avoid touching lib/query/keys) */
export const WATER_QUERY_KEYS = {
  list: (startDate: string, endDate: string, page: number, limit: number) =>
    ["water", "list", startDate, endDate, page, limit] as const,
  listForChart: (startDate: string, endDate: string) =>
    ["water", "listChart", startDate, endDate] as const,
  detail: (id: string) => ["water", "detail", id] as const,
  hydrationInsights: (startDate: string, endDate: string) =>
    ["water", "hydrationInsights", startDate, endDate] as const,
};

/** Quick-add preset amounts for the add water dialog */
export const QUICK_AMOUNTS = [
  { label: "Small Glass", amount: 200 },
  { label: "Medium Glass", amount: 250 },
  { label: "Large Glass", amount: 350 },
  { label: "Bottle", amount: 500 },
  { label: "Large Bottle", amount: 750 },
  { label: "1 Liter", amount: 1000 },
] as const;
