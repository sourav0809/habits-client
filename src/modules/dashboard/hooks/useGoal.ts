import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { getGoal } from "../api";
import type { Goal } from "@/modules/goals/types";

/** Hook to fetch user's goal */
export function useGoal() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.goal,
    queryFn: getGoal,
  });
}

/** Normalize goal response to Goal | null */
export function normalizeGoal(data: { goal: Goal | null } | undefined): Goal | null {
  return data?.goal ?? null;
}
