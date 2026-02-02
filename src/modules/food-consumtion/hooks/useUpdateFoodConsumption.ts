import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { updateFoodConsumption } from "../api";
import type {
  UpdateFoodConsumptionBody,
  UpdateFoodConsumptionResponse,
} from "../types";
import { toast } from "sonner";

export function useUpdateFoodConsumption(options?: {
  onSuccess?: (data: UpdateFoodConsumptionResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateFoodConsumptionResponse,
    Error,
    { id: string; body: UpdateFoodConsumptionBody }
  >({
    mutationFn: ({ id, body }) => updateFoodConsumption(id, body),
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.food.list });
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "food" &&
          query.queryKey[1] === "consumption",
      });
      toast.success("Food consumption updated successfully");
      options?.onSuccess?.(_data);
    },
  });
}
