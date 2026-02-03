import { api } from "@/lib/api/client";
import type {
  AddWaterBody,
  AddWaterResponse,
  DeleteWaterResponse,
  GetWaterLogsQuery,
  GetWaterLogsResponse,
  GetWaterLogResponse,
  HydrationInsightsQuery,
  HydrationInsightsResponse,
  UpdateWaterBody,
  UpdateWaterResponse,
} from "../types";

const BASE = "/v1/user/water/consumption";
const ANALYTICS_BASE = "/v1/user/analytics";

export async function getWaterLogs(
  params?: GetWaterLogsQuery
): Promise<GetWaterLogsResponse> {
  return api.get<GetWaterLogsResponse>(BASE, params);
}

export async function getWaterLog(
  id: string
): Promise<GetWaterLogResponse> {
  return api.get<GetWaterLogResponse>(`${BASE}/${id}`);
}

export async function addWater(
  body: AddWaterBody
): Promise<AddWaterResponse> {
  return api.post<AddWaterResponse, AddWaterBody>(BASE, body);
}

export async function updateWater(
  id: string,
  body: UpdateWaterBody
): Promise<UpdateWaterResponse> {
  return api.patch<UpdateWaterResponse, UpdateWaterBody>(`${BASE}/${id}`, body);
}

export async function deleteWater(
  id: string
): Promise<DeleteWaterResponse> {
  return api.delete<DeleteWaterResponse>(`${BASE}/${id}`);
}

export async function getHydrationInsights(
  params?: HydrationInsightsQuery
): Promise<HydrationInsightsResponse> {
  return api.get<HydrationInsightsResponse>(
    `${ANALYTICS_BASE}/hydration-insights`,
    params
  );
}
