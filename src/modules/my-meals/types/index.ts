import type { z } from "zod";
import { addFoodInputSchema, updateFoodInputSchema } from "../schema";

/** Single food as returned by API */
export interface Food {
  id: string;
  userId: string;
  name: string;
  caloriesPerGram: number;
  defaultQuantity: number;
  createdAt: string;
  updatedAt: string;
}

/** GET /api/v1/food – extracted data shape */
export interface GetFoodsResponse {
  foods: Food[];
}

/** POST /api/v1/food – request body */
export interface AddFoodBody {
  name: string;
  caloriesPerGram: number;
  defaultQuantity: number;
}

/** POST /api/v1/food – extracted data shape */
export interface AddFoodResponse {
  food: Food;
}

/** Form input for add food (kcal/100g shown in UI, converted to caloriesPerGram for API) */
export type AddFoodInput = z.infer<typeof addFoodInputSchema>;

/** Form input for update food (at least one field) */
export type UpdateFoodInput = z.infer<typeof updateFoodInputSchema>;

/** PATCH /api/v1/food/:id – request body (at least one field) */
export interface UpdateFoodBody {
  name?: string;
  caloriesPerGram?: number;
  defaultQuantity?: number;
}

/** PATCH /api/v1/food/:id – extracted data shape */
export interface UpdateFoodResponse {
  food: Food;
}

/** DELETE /api/v1/food/:id – extracted data shape (empty object) */
export type DeleteFoodResponse = Record<string, never>;
