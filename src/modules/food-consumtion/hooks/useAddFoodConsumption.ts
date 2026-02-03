import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { addFoodConsumption } from "../api";
import type {
  AddFoodConsumptionBody,
  AddFoodConsumptionResponse,
} from "../types";
import type { AddConsumptionInput } from "../types";
import { toast } from "sonner";

function toAddConsumptionBody(input: AddConsumptionInput): AddFoodConsumptionBody {
  return {
    userFoodId: input.userFoodId,
    quantity: Math.round(input.quantity),
    dateAndTime: input.dateAndTime ?? undefined,
  };
}

export function useAddFoodConsumption(options?: {
  onSuccess?: (data: AddFoodConsumptionResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<
    AddFoodConsumptionResponse,
    Error,
    AddConsumptionInput
  >({
    mutationFn: (input: AddConsumptionInput) =>
      addFoodConsumption(toAddConsumptionBody(input)),
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.food.list });
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "food",
      });
      toast.success("Food consumption added successfully");
      options?.onSuccess?.(_data);
    },
  });
}
