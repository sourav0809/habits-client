import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { updateFoodConsumption } from "../api";
import type {
  UpdateFoodConsumptionBody,
  UpdateFoodConsumptionResponse,
} from "../types";
import type { UpdateConsumptionInput } from "../types";
import { toast } from "sonner";

function toUpdateConsumptionBody(input: UpdateConsumptionInput): UpdateFoodConsumptionBody {
  const body: UpdateFoodConsumptionBody = {};
  if (input.quantity !== undefined) body.quantity = Math.round(input.quantity);
  if (input.dateAndTime !== undefined && input.dateAndTime !== null)
    body.dateAndTime = input.dateAndTime;
  if (input.userFoodId !== undefined && input.userFoodId.length > 0)
    body.userFoodId = input.userFoodId;
  return body;
}

export function useUpdateFoodConsumption(options?: {
  onSuccess?: (data: UpdateFoodConsumptionResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateFoodConsumptionResponse,
    Error,
    { id: string; body: UpdateConsumptionInput }
  >({
    mutationFn: ({ id, body }) =>
      updateFoodConsumption(id, toUpdateConsumptionBody(body)),
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.food.list });
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "food",
      });
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "dashboard",
      });
      toast.success("Food consumption updated successfully");
      options?.onSuccess?.(_data);
    },
  });
}
