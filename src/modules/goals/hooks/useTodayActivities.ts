import { useQuery } from "@tanstack/react-query";
import { getTodayActivities } from "../api";
import type { TodayActivitiesResponse } from "../types";
import { QUERY_KEYS } from "@/lib/query/keys";

export function useTodayActivities(options?: { enabled?: boolean }) {
  return useQuery<TodayActivitiesResponse>({
    queryKey: QUERY_KEYS.goals.todayActivities,
    queryFn: getTodayActivities,
    enabled: options?.enabled ?? true,
  });
}
