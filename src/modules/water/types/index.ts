import type { z } from "zod";
import { addWaterInputSchema, updateWaterInputSchema } from "../schema";

/** Water log – API response shape */
export interface WaterLog {
  id: string;
  userId: string;
  userActivityId: string;
  amountMl: number;
  dateAndTime: string;
  createdAt: string;
  updatedAt: string;
}

/** GET list – query params */
export interface GetWaterLogsQuery {
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

/** GET list – pagination meta from API */
export interface WaterLogsPagination {
  page: number;
  limit: number;
  totalEntries: number;
  totalPages: number;
}

/** GET list – summary over full date range */
export interface WaterLogsSummary {
  totalWaterMl: number;
  averagePerLog: number;
}

/** GET list – extracted data shape */
export interface GetWaterLogsResponse {
  logs: WaterLog[];
  pagination: WaterLogsPagination;
  summary: WaterLogsSummary;
}

/** GET one – extracted data shape */
export interface GetWaterLogResponse {
  log: WaterLog;
}

/** POST add – request body */
export interface AddWaterBody {
  amount: number;
  dateAndTime: string;
}

/** POST add – extracted data shape */
export interface AddWaterResponse {
  log: WaterLog;
}

/** PATCH update – request body */
export interface UpdateWaterBody {
  amount?: number;
  dateAndTime?: string;
}

/** PATCH update – extracted data shape */
export interface UpdateWaterResponse {
  log: WaterLog;
}

/** DELETE – extracted data shape */
export type DeleteWaterResponse = Record<string, never>;

export type AddWaterInput = z.infer<typeof addWaterInputSchema>;
export type UpdateWaterInput = z.infer<typeof updateWaterInputSchema>;

/** GET hydration insights – query params (use startDate + endDate for date range) */
export interface HydrationInsightsQuery {
  startDate?: string;
  endDate?: string;
  range?: string;
  unit?: "day" | "month" | "year";
}

/** GET hydration insights – response shape */
export interface HydrationInsightsResponse {
  dayStreak: number;
  goalsMet: number;
  dailyAvgMl: number;
  dailyAvgL: number;
  bestDayMl: number;
  bestDayL: number;
  targetWaterMl: number | null;
}
