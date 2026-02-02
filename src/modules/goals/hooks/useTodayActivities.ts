import { useQuery } from "@tanstack/react-query";
import { getTodayActivities } from "../api";
import type { TodayActivitiesResponse } from "../types";
import { TODAY_ACTIVITIES_QUERY_KEY } from "../constants";

export function useTodayActivities(options?: { enabled?: boolean }) {
  return useQuery<TodayActivitiesResponse>({
    queryKey: TODAY_ACTIVITIES_QUERY_KEY,
    queryFn: getTodayActivities,
    enabled: options?.enabled ?? true,
  });
}
