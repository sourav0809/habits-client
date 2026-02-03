import { useQuery } from "@tanstack/react-query";
import { getGoal } from "../api";
import type { GetGoalResponse } from "../types";
import { QUERY_KEYS } from "@/lib/query/keys";

export function useGoal() {
  return useQuery<GetGoalResponse>({
    queryKey: QUERY_KEYS.goals.goal,
    queryFn: getGoal,
  });
}
