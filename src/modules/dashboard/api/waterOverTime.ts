import { api } from "@/lib/api/client";
import type { WaterOverTimeQuery, WaterOverTimeResponse } from "../types";

const ANALYTICS_BASE = "/v1/user/analytics";

/**
 * Get water intake over time for charts
 * GET /api/v1/user/analytics/water-over-time
 */
export async function getWaterOverTime(
  params?: WaterOverTimeQuery
): Promise<WaterOverTimeResponse> {
  return api.get<WaterOverTimeResponse>(`${ANALYTICS_BASE}/water-over-time`, params);
}
