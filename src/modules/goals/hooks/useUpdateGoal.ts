import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGoal } from "../api";
import type {
  UpdateGoalBody,
  UpdateGoalResponse,
} from "../types";
import { QUERY_KEYS } from "@/lib/query/keys";
import { toast } from "sonner";

export function useUpdateGoal(options?: {
  onSuccess?: (data: UpdateGoalResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<UpdateGoalResponse, Error, UpdateGoalBody>({
    mutationFn: updateGoal,
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.goals.goal, { goal: data.goal });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.goals.todayActivities,
      });
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "user" &&
          query.queryKey[1] === "analytics",
      });
      toast.success("Goal updated successfully");
      options?.onSuccess?.(data);
    },
  });
}
