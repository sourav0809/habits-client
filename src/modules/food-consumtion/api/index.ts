import { api } from "@/lib/api/client";
import type {
  AddFoodConsumptionBody,
  AddFoodConsumptionResponse,
  DeleteFoodConsumptionResponse,
  GetFoodConsumptionsQuery,
  GetFoodConsumptionsResponse,
  GetFoodConsumptionResponse,
  UpdateFoodConsumptionBody,
  UpdateFoodConsumptionResponse,
} from "../types";

/**
 * Get all food consumptions (date range)
 * GET /api/v1/user/food/consumption
 */
export async function getFoodConsumptions(
  params?: GetFoodConsumptionsQuery
): Promise<GetFoodConsumptionsResponse> {
  return api.get<GetFoodConsumptionsResponse>('v1/user/food/consumption', params);
}

/**
 * Get one food consumption
 * GET /api/v1/user/food/consumption/:id
 */
export async function getFoodConsumption(
  id: string
): Promise<GetFoodConsumptionResponse> {
  return api.get<GetFoodConsumptionResponse>(`v1/user/food/consumption/${id}`);
}

/**
 * Add food consumption (log food for a day)
 * POST /api/v1/user/food/consumption
 */
export async function addFoodConsumption(
  body: AddFoodConsumptionBody
): Promise<AddFoodConsumptionResponse> {
  return api.post<AddFoodConsumptionResponse, AddFoodConsumptionBody>(
    'v1/user/food/consumption',
    body
  );
}

/**
 * Update food consumption (quantity only)
 * PATCH /api/v1/user/food/consumption/:id
 */
export async function updateFoodConsumption(
  id: string,
  body: UpdateFoodConsumptionBody
): Promise<UpdateFoodConsumptionResponse> {
  return api.patch<UpdateFoodConsumptionResponse, UpdateFoodConsumptionBody>(
    `v1/user/food/consumption/${id}`,
    body
  );
}

/**
 * Delete food consumption (soft delete)
 * DELETE /api/v1/user/food/consumption/:id
 */
export async function deleteFoodConsumption(
  id: string
): Promise<DeleteFoodConsumptionResponse> {
  return api.delete<DeleteFoodConsumptionResponse>(
    `v1/user/food/consumption/${id}`
  );
}
