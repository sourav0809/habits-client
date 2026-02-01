import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { getMyFoods } from "../api";
import type { GetFoodsResponse } from "../types";

export function useMyFoods() {
  return useQuery<GetFoodsResponse>({
    queryKey: QUERY_KEYS.food.list,
    queryFn: getMyFoods,
  });
}
