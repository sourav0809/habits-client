import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { getFoodConsumptions } from "../api";
import type {
  GetFoodConsumptionsQuery,
  GetFoodConsumptionsResponse,
} from "../types";
import { getTodayISO } from "../utils";
import { FOOD_CONSUMPTIONS_PAGE_LIMIT } from "../constants";

export interface UseFoodConsumptionsParams {
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export function useFoodConsumptions(params?: UseFoodConsumptionsParams) {
  const startDate = params?.startDate ?? getTodayISO();
  const endDate = params?.endDate ?? getTodayISO();
  const page = params?.page ?? 1;
  const limit = params?.limit ?? FOOD_CONSUMPTIONS_PAGE_LIMIT;

  return useQuery<GetFoodConsumptionsResponse>({
    queryKey: QUERY_KEYS.foodConsumption.list(startDate, endDate, page, limit),
    queryFn: () =>
      getFoodConsumptions({
        startDate,
        endDate,
        page,
        limit,
      } as GetFoodConsumptionsQuery),
  });
}
