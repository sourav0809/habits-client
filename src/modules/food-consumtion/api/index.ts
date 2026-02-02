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

const CONSUMPTION_BASE = "v1/user/food/consumption";

/**
 * Get all food consumptions (date range)
 * GET /api/v1/user/food/consumption
 */
export async function getFoodConsumptions(
  params?: GetFoodConsumptionsQuery
): Promise<GetFoodConsumptionsResponse> {
  return api.get<GetFoodConsumptionsResponse>(CONSUMPTION_BASE, params);
}

/**
 * Get one food consumption
 * GET /api/v1/user/food/consumption/:id
 */
export async function getFoodConsumption(
  id: string
): Promise<GetFoodConsumptionResponse> {
  return api.get<GetFoodConsumptionResponse>(`${CONSUMPTION_BASE}/${id}`);
}

/**
 * Add food consumption (log food for a day)
 * POST /api/v1/user/food/consumption
 */
export async function addFoodConsumption(
  body: AddFoodConsumptionBody
): Promise<AddFoodConsumptionResponse> {
  return api.post<AddFoodConsumptionResponse, AddFoodConsumptionBody>(
    CONSUMPTION_BASE,
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
    `${CONSUMPTION_BASE}/${id}`,
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
    `${CONSUMPTION_BASE}/${id}`
  );
}
