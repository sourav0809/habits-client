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
}

/** GET list – extracted data shape */
export interface GetWaterLogsResponse {
  logs: WaterLog[];
}

/** GET one – extracted data shape */
export interface GetWaterLogResponse {
  log: WaterLog;
}

/** POST add – request body */
export interface AddWaterBody {
  amount: number;
  dateAndTime?: string;
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
