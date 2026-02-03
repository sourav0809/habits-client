import { api } from "@/lib/api/client";
import type {
  AddFoodConsumptionBody,
  AddFoodConsumptionResponse,
  CaloriesOverTimeQuery,
  CaloriesOverTimeResponse,
  DeleteFoodConsumptionResponse,
  GetFoodConsumptionsQuery,
  GetFoodConsumptionsResponse,
  GetFoodConsumptionResponse,
  UpdateFoodConsumptionBody,
  UpdateFoodConsumptionResponse,
} from "../types";

const FOOD_BASE = "v1/user/food/consumption";
const ANALYTICS_BASE = "v1/user/analytics";

/**
 * Get food consumptions (date range, paginated)
 * GET /api/v1/user/food/consumption
 */
export async function getFoodConsumptions(
  params?: GetFoodConsumptionsQuery
): Promise<GetFoodConsumptionsResponse> {
  return api.get<GetFoodConsumptionsResponse>(FOOD_BASE, params);
}

/**
 * Get calories over time (stats + chart data)
 * GET /api/v1/user/analytics/calories-over-time
 */
export async function getCaloriesOverTime(
  params?: CaloriesOverTimeQuery
): Promise<CaloriesOverTimeResponse> {
  return api.get<CaloriesOverTimeResponse>(
    `${ANALYTICS_BASE}/calories-over-time`,
    params
  );
}

/**
 * Get one food consumption
 * GET /api/v1/user/food/consumption/:id
 */
export async function getFoodConsumption(
  id: string
): Promise<GetFoodConsumptionResponse> {
  return api.get<GetFoodConsumptionResponse>(`${FOOD_BASE}/${id}`);
}

/**
 * Add food consumption (log food for a day)
 * POST /api/v1/user/food/consumption
 */
export async function addFoodConsumption(
  body: AddFoodConsumptionBody
): Promise<AddFoodConsumptionResponse> {
  return api.post<AddFoodConsumptionResponse, AddFoodConsumptionBody>(
    FOOD_BASE,
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
    `${FOOD_BASE}/${id}`,
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
  return api.delete<DeleteFoodConsumptionResponse>(`${FOOD_BASE}/${id}`);
}
