import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { meApi } from "../api";
import { getStoredToken } from "../helpers";

export function useMe(enabled?: boolean) {
  const hasToken = !!getStoredToken();
  return useQuery({
    queryKey: QUERY_KEYS.auth.me,
    queryFn: () => meApi(),
    enabled: enabled !== undefined ? enabled : hasToken,
  });
}
