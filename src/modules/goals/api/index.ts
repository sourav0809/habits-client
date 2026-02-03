import { api } from "@/lib/api/client";
import { ApiError } from "@/lib/api/client";
import type {
  CreateGoalBody,
  CreateGoalResponse,
  GetGoalResponse,
  UpdateGoalBody,
  UpdateGoalResponse,
  CaloriesProgressResponse,
  WaterProgressResponse,
  GoalAchievementTrendResponse,
  TodayActivitiesResponse,
  AnalyticsQueryParams,
} from "../types";

const GOALS_BASE = "v1/user/goals";
const ANALYTICS_BASE = "v1/user/analytics";
const ACTIVITIES_BASE = "v1/user/activities";

/**
 * Get current user's goal.
 * GET /api/v1/user/goals
 * Returns { goal: null } when no goal exists (404); otherwise { goal: Goal }.
 */
export async function getGoal(): Promise<GetGoalResponse> {
  try {
    return await api.get<GetGoalResponse>(GOALS_BASE);
  } catch (e) {
    const err = e as ApiError;
    if (err?.status === 404) {
      return { goal: null };
    }
    throw e;
  }
}

/**
 * Create goal.
 * POST /api/v1/user/goals
 */
export async function createGoal(
  body: CreateGoalBody
): Promise<CreateGoalResponse> {
  return api.post<CreateGoalResponse, CreateGoalBody>(GOALS_BASE, body);
}

/**
 * Update goal.
 * PATCH /api/v1/user/goals
 */
export async function updateGoal(
  body: UpdateGoalBody
): Promise<UpdateGoalResponse> {
  return api.patch<UpdateGoalResponse, UpdateGoalBody>(GOALS_BASE, body);
}

/**
 * Get calories progress.
 * GET /api/v1/user/analytics/calories-progress
 * @returns CaloriesProgressResponse
 */
export async function getCaloriesProgress(
  params?: AnalyticsQueryParams
): Promise<CaloriesProgressResponse> {
  return api.get<CaloriesProgressResponse>(
    `${ANALYTICS_BASE}/calories-progress`,
    params
  );
}

/**
 * Get water progress.
 * GET /api/v1/user/analytics/water-progress
 * @returns WaterProgressResponse
 */
export async function getWaterProgress(
  params?: AnalyticsQueryParams
): Promise<WaterProgressResponse> {
  return api.get<WaterProgressResponse>(
    `${ANALYTICS_BASE}/water-progress`,
    params
  );
}

/**
 * Get goal achievement trend.
 * GET /api/v1/user/analytics/goal-achievement-trend
 * @returns GoalAchievementTrendResponse
 */
export async function getGoalAchievementTrend(
  params?: AnalyticsQueryParams
): Promise<GoalAchievementTrendResponse> {
  return api.get<GoalAchievementTrendResponse>(
    `${ANALYTICS_BASE}/goal-achievement-trend`,
    params
  );
}

/**
 * Get today activities.
 * GET /api/v1/user/activities/today
 * @returns TodayActivitiesResponse
 */
export async function getTodayActivities(): Promise<TodayActivitiesResponse> {
  return api.get<TodayActivitiesResponse>(`${ACTIVITIES_BASE}/today`);
};

export default getTodayActivities;
