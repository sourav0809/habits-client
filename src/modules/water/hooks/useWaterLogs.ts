import { useQuery } from "@tanstack/react-query";
import { getWaterLogs } from "../api";
import type {
  GetWaterLogsQuery,
  GetWaterLogsResponse,
} from "../types";
import { getTodayISO } from "../utils";
import { WATER_QUERY_KEYS } from "../constants";

export function useWaterLogs(params?: GetWaterLogsQuery) {
  const startDate = params?.startDate ?? getTodayISO();
  const endDate = params?.endDate ?? getTodayISO();

  return useQuery<GetWaterLogsResponse>({
    queryKey: WATER_QUERY_KEYS.list(startDate, endDate),
    queryFn: () => getWaterLogs({ startDate, endDate }),
  });
}
