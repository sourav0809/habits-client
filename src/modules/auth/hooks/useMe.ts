import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { getCurrentUser } from "../api";
import { getAuthToken } from "@/utils";

export function useMe(enabled?: boolean) {
  const hasToken = !!getAuthToken();
  return useQuery({
    queryKey: QUERY_KEYS.auth.me,
    queryFn: () => getCurrentUser(),
    enabled: enabled !== undefined ? enabled : hasToken,
  });
}
