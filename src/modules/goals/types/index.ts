/** Goal document as returned by API (in data.goal) */
export interface Goal {
  id: string;
  userId: string;
  targetWaterMl: number;
  targetCalories: number;
  createdAt: string;
  updatedAt: string;
}

/** GET /api/v1/user/goals – extracted data shape (goal is null when 404) */
export interface GetGoalResponse {
  goal: Goal | null;
}

/** POST /api/v1/user/goals – request body */
export interface CreateGoalBody {
  targetWaterMl: number;
  targetCalories: number;
}

/** POST /api/v1/user/goals – extracted data shape */
export interface CreateGoalResponse {
  goal: Goal;
}

/** PATCH /api/v1/user/goals – request body (at least one field) */
export interface UpdateGoalBody {
  targetWaterMl?: number;
  targetCalories?: number;
}

/** PATCH /api/v1/user/goals – extracted data shape */
export interface UpdateGoalResponse {
  goal: Goal;
}

/** UI-friendly goal settings (for forms and display) */
export interface GoalSettings {
  dailyKcal: number;
  dailyWater: number;
}

// ---------------------------------------------------------------------------
// Analytics API (GET /api/v1/user/analytics/*)
// ---------------------------------------------------------------------------

/** Query params for analytics endpoints */
export interface AnalyticsQueryParams {
  range?: string;
  unit?: string;
}

/** Calories progress – data point */
export interface CaloriesProgressDataPoint {
  period: string;
  averageCalories: number;
  dayCount: number;
}

/** GET calories-progress – extracted data shape */
export interface CaloriesProgressResponse {
  dataPoints: CaloriesProgressDataPoint[];
  summary: { overallAverage: number };
}

/** Water progress – data point */
export interface WaterProgressDataPoint {
  period: string;
  averageWaterMl: number;
  dayCount: number;
}

/** GET water-progress – extracted data shape */
export interface WaterProgressResponse {
  dataPoints: WaterProgressDataPoint[];
  summary: { overallAverage: number };
}

/** Goal achievement trend – data point */
export interface GoalAchievementTrendDataPoint {
  period: string;
  caloriesPercent: number;
  waterPercent: number;
  totalCalories: number;
  totalWaterMl: number;
  dayCount: number;
}

/** GET goal-achievement-trend – extracted data shape */
export interface GoalAchievementTrendResponse {
  dataPoints: GoalAchievementTrendDataPoint[];
}

// ---------------------------------------------------------------------------
// Today activities (GET /api/v1/user/activities/today)
// ---------------------------------------------------------------------------

export interface TodayActivity {
  id: string;
  userId: string;
  date: string;
  totalCalories: number;
  totalWaterMl: number;
  deletedAt: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

/** GET today – extracted data shape (activities can be single object or array) */
export interface TodayActivitiesResponse {
  activities: TodayActivity | TodayActivity[];
}
