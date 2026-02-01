import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { updateFood } from "../api";
import type { UpdateFoodBody, UpdateFoodResponse } from "../types";
import type { UpdateFoodInput } from "../types";
import { toast } from "sonner";

function toUpdateFoodBody(input: UpdateFoodInput): UpdateFoodBody {
  const body: UpdateFoodBody = {};
  if (input.name !== undefined) body.name = input.name.trim();
  if (input.defaultQuantity !== undefined)
    body.defaultQuantity = Math.round(input.defaultQuantity);
  if (input.kcalPer100g !== undefined)
    body.caloriesPerGram = input.kcalPer100g / 100;
  return body;
}

export function useUpdateFood(options?: {
  onSuccess?: (data: UpdateFoodResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateFoodResponse,
    Error,
    { id: string; input: UpdateFoodInput }
  >({
    mutationFn: ({ id, input }) =>
      updateFood(id, toUpdateFoodBody(input)),
    onSuccess: (data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.food.list });
      toast.success("Food updated successfully");
      options?.onSuccess?.(data);
    },
  });
}
