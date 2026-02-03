import { useQuery } from "@tanstack/react-query";
import { getGoal } from "../api";
import { DASHBOARD_QUERY_KEYS } from "./queryKeys";
import type { Goal } from "@/modules/goals/types";

/** Hook to fetch user's goal */
export function useGoal() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.goal,
    queryFn: getGoal,
  });
}

/** Normalize goal response to Goal | null */
export function normalizeGoal(data: { goal: Goal | null } | undefined): Goal | null {
  return data?.goal ?? null;
}
