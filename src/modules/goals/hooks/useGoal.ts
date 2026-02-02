import { useQuery } from "@tanstack/react-query";
import { getGoal } from "../api";
import type { GetGoalResponse } from "../types";
import { GOAL_QUERY_KEY } from "../constants";

export function useGoal() {
  return useQuery<GetGoalResponse>({
    queryKey: GOAL_QUERY_KEY,
    queryFn: getGoal,
  });
}
