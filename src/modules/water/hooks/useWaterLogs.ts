import { useQuery } from "@tanstack/react-query";
import { getWaterLogs } from "../api";
import type {
  GetWaterLogsQuery,
  GetWaterLogsResponse,
} from "../types";
import { getTodayISO } from "../utils";
import {
  WATER_QUERY_KEYS,
  WATER_LOGS_PAGE_LIMIT,
  WATER_CHART_LOGS_LIMIT,
} from "../constants";

export interface UseWaterLogsParams {
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export function useWaterLogs(params?: UseWaterLogsParams) {
  const startDate = params?.startDate ?? getTodayISO();
  const endDate = params?.endDate ?? getTodayISO();
  const page = params?.page ?? 1;
  const limit = params?.limit ?? WATER_LOGS_PAGE_LIMIT;

  return useQuery<GetWaterLogsResponse>({
    queryKey: WATER_QUERY_KEYS.list(startDate, endDate, page, limit),
    queryFn: () =>
      getWaterLogs({ startDate, endDate, page, limit } as GetWaterLogsQuery),
  });
}

/** Fetches logs for chart only (high limit, one page) – daily aggregation. */
export function useWaterLogsForChart(dateFrom: string, dateTo: string) {
  return useQuery<GetWaterLogsResponse>({
    queryKey: WATER_QUERY_KEYS.listForChart(dateFrom, dateTo),
    queryFn: () =>
      getWaterLogs({
        startDate: dateFrom,
        endDate: dateTo,
        page: 1,
        limit: WATER_CHART_LOGS_LIMIT,
      } as GetWaterLogsQuery),
  });
}
