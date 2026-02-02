import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGoal } from "../api";
import type {
  CreateGoalBody,
  CreateGoalResponse,
} from "../types";
import { GOAL_QUERY_KEY, TODAY_ACTIVITIES_QUERY_KEY } from "../constants";
import { toast } from "sonner";

export function useCreateGoal(options?: {
  onSuccess?: (data: CreateGoalResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<CreateGoalResponse, Error, CreateGoalBody>({
    mutationFn: createGoal,
    onSuccess: (data) => {
      queryClient.setQueryData(GOAL_QUERY_KEY, { goal: data.goal });
      queryClient.invalidateQueries({ queryKey: TODAY_ACTIVITIES_QUERY_KEY });
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "user" &&
          query.queryKey[1] === "analytics",
      });
      toast.success("Goal created successfully");
      options?.onSuccess?.(data);
    },
  });
}
