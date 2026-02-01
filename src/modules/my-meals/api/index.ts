import { api } from "@/lib/api/client";
import type {
  AddFoodBody,
  AddFoodResponse,
  DeleteFoodResponse,
  GetFoodsResponse,
  UpdateFoodBody,
  UpdateFoodResponse,
} from "../types";

const FOOD_BASE = "v1/user/food";

/**
 * Get current user's foods
 * GET /api/v1/food
 */
export async function getMyFoods(): Promise<GetFoodsResponse> {
  return api.get<GetFoodsResponse>(FOOD_BASE);
}

/**
 * Add a food
 * POST /api/v1/food
 */
export async function addFood(body: AddFoodBody): Promise<AddFoodResponse> {
  return api.post<AddFoodResponse, AddFoodBody>(FOOD_BASE, body);
}

/**
 * Update a food
 * PATCH /api/v1/food/:id
 */
export async function updateFood(
  id: string,
  body: UpdateFoodBody
): Promise<UpdateFoodResponse> {
  return api.patch<UpdateFoodResponse, UpdateFoodBody>(
    `${FOOD_BASE}/${id}`,
    body
  );
}

/**
 * Delete a food (soft delete)
 * DELETE /api/v1/food/:id
 */
export async function deleteFood(id: string): Promise<DeleteFoodResponse> {
  return api.delete<DeleteFoodResponse>(`${FOOD_BASE}/${id}`);
}
