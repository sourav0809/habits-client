import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGoal } from "../api";
import type {
  CreateGoalBody,
  CreateGoalResponse,
} from "../types";
import { QUERY_KEYS } from "@/lib/query/keys";
import { toast } from "sonner";

export function useCreateGoal(options?: {
  onSuccess?: (data: CreateGoalResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<CreateGoalResponse, Error, CreateGoalBody>({
    mutationFn: createGoal,
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
      toast.success("Goal created successfully");
      options?.onSuccess?.(data);
    },
  });
}
