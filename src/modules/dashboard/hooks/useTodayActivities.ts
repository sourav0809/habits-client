import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { getTodayActivities } from "../api";

/** Hook to fetch today's activities */
export function useTodayActivities(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.todayActivities,
    queryFn: getTodayActivities,
    enabled: options?.enabled ?? true,
  });
}
