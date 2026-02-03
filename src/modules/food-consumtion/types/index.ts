import type { z } from "zod";
import { addConsumptionInputSchema, updateConsumptionInputSchema } from "../schema";

/** Populated userFoodId on GET list */
export interface ConsumptionUserFood {
  id: string;
  name: string;
  caloriesPerGram: number;
  defaultQuantity: number;
}

/** Single food consumption – userFoodId is populated on list, string on other endpoints */
export interface FoodConsumption {
  id: string;
  userId: string;
  userActivityId: string;
  userFoodId: string | ConsumptionUserFood;
  /** ISO 8601 date-time. Prefer dateAndTime; fallback to date for legacy responses. */
  dateAndTime?: string;
  /** @deprecated Use dateAndTime. Kept for backward compatibility if backend still sends date. */
  date?: string;
  quantity: number;
  totalCalories: number;
  createdAt: string;
  updatedAt: string;
}

/** GET list – query params */
export interface GetFoodConsumptionsQuery {
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

/** GET list – pagination meta from API */
export interface FoodConsumptionsPagination {
  page: number;
  limit: number;
  totalEntries: number;
  totalPages: number;
}

/** GET list – extracted data shape (after api client unwraps data) */
export interface GetFoodConsumptionsResponse {
  consumptions: FoodConsumption[];
  pagination: FoodConsumptionsPagination;
}

/** GET calories over time – query (use startDate + endDate only) */
export interface CaloriesOverTimeQuery {
  startDate?: string;
  endDate?: string;
  range?: string;
  unit?: "day" | "month" | "year";
}

/** One data point for calories-over-time chart */
export interface CaloriesOverTimePoint {
  period: string;
  calories: number;
}

/** GET calories over time – response shape */
export interface CaloriesOverTimeResponse {
  caloriesOverTime: CaloriesOverTimePoint[];
  calories: number;
  mealsLogged: number;
  avgCaloriesPerMeal: number;
}

/** GET one – extracted data shape */
export interface GetFoodConsumptionResponse {
  consumption: FoodConsumption;
}

/** POST add – request body */
export interface AddFoodConsumptionBody {
  userFoodId: string;
  quantity: number;
  dateAndTime?: string | null;
}

/** POST add – extracted data shape */
export interface AddFoodConsumptionResponse {
  consumption: FoodConsumption;
}

/** Form input for add consumption */
export type AddConsumptionInput = z.infer<typeof addConsumptionInputSchema>;

/** PATCH update – request body (at least one optional field) */
export interface UpdateFoodConsumptionBody {
  quantity?: number;
  dateAndTime?: string | null;
  userFoodId?: string;
}

/** Form input for update consumption */
export type UpdateConsumptionInput = z.infer<typeof updateConsumptionInputSchema>;

/** PATCH update – extracted data shape */
export interface UpdateFoodConsumptionResponse {
  consumption: FoodConsumption;
}

/** DELETE – extracted data shape */
export type DeleteFoodConsumptionResponse = Record<string, never>;
