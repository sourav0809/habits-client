import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { addFood } from "../api";
import type { AddFoodBody, AddFoodResponse } from "../types";
import type { AddFoodInput } from "../types";
import { toast } from "sonner";

function toAddFoodBody(input: AddFoodInput): AddFoodBody {
  return {
    name: input.name.trim(),
    defaultQuantity: Math.round(input.defaultQuantity),
    caloriesPerGram: input.kcalPer100g / 100,
  };
}

export function useAddFood(options?: {
  onSuccess?: (data: AddFoodResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<AddFoodResponse, Error, AddFoodInput>({
    mutationFn: (input: AddFoodInput) => addFood(toAddFoodBody(input)),
    onSuccess: (data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.food.list });
      toast.success("Food added successfully");
      options?.onSuccess?.(data);
    },
  });
}
