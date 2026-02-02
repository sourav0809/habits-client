import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGoal } from "../api";
import type {
  UpdateGoalBody,
  UpdateGoalResponse,
} from "../types";
import { GOAL_QUERY_KEY, TODAY_ACTIVITIES_QUERY_KEY } from "../constants";
import { toast } from "sonner";

export function useUpdateGoal(options?: {
  onSuccess?: (data: UpdateGoalResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<UpdateGoalResponse, Error, UpdateGoalBody>({
    mutationFn: updateGoal,
    onSuccess: (data) => {
      queryClient.setQueryData(GOAL_QUERY_KEY, { goal: data.goal });
      queryClient.invalidateQueries({ queryKey: TODAY_ACTIVITIES_QUERY_KEY });
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
