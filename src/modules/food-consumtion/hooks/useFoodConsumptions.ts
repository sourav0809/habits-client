import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { getFoodConsumptions } from "../api";
import type { GetFoodConsumptionsQuery, GetFoodConsumptionsResponse } from "../types";
import { getTodayISO } from "../utils";

export function useFoodConsumptions(params?: GetFoodConsumptionsQuery) {
  const startDate = params?.startDate ?? getTodayISO();
  const endDate = params?.endDate ?? getTodayISO();

  return useQuery<GetFoodConsumptionsResponse>({
    queryKey: QUERY_KEYS.foodConsumption.list(startDate, endDate),
    queryFn: () => getFoodConsumptions({ startDate, endDate }),
  });
}
