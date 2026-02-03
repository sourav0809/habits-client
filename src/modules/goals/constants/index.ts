/** Range for 1 week (analytics API) */
export const ANALYTICS_RANGE_7D = "7d";

/** Range for 1 month (analytics API) */
export const ANALYTICS_RANGE_1M = "1m";

/** Unit day for analytics */
export const ANALYTICS_UNIT_DAY = "day";

/** Last 1 week for Calorie/Water progress charts */
export const DAYS_1_WEEK = 7;

/** Last 1 month for trend and overview */
export const DAYS_1_MONTH = 30;

/** Message when user has not set a goal yet */
export const GOAL_NOT_SET_MESSAGE =
  "Your goal is not set. Please set the goal to keep 1 step ahead from others.";

/** Default calorie goal (kcal) */
export const DEFAULT_CALORIE_GOAL = 2000;

/** Default water goal (ml) */
export const DEFAULT_WATER_GOAL_ML = 2500;

/** Preset calorie options for Edit Goals dialog */
export const PRESET_CALORIES = [1500, 1800, 2000, 2200, 2500, 3000] as const;

/** Preset water options (ml) for Edit Goals dialog */
export const PRESET_WATER_ML = [1500, 2000, 2500, 3000, 3500, 4000] as const;
