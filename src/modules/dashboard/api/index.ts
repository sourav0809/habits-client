/**
 * Dashboard API - Re-exports analytics APIs from other modules
 * All APIs already exist and are tested in their respective modules
 */

// Goal APIs
export {
  getGoal,
  getTodayActivities,
  getCaloriesProgress,
  getWaterProgress,
  getGoalAchievementTrend,
} from "@/modules/goals/api";

// Food consumption analytics
export { getCaloriesOverTime } from "@/modules/food-consumtion/api";

// Water analytics
export { getHydrationInsights } from "@/modules/water/api";

// Dashboard-specific APIs
export { getWaterOverTime } from "./waterOverTime";
