import { useQuery } from "@tanstack/react-query";
import { getTodayActivities } from "../api";
import { DASHBOARD_QUERY_KEYS } from "./queryKeys";

/** Hook to fetch today's activities */
export function useTodayActivities(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.todayActivities,
    queryFn: getTodayActivities,
    enabled: options?.enabled ?? true,
  });
}
