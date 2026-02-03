import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addWater } from "../api";
import type { AddWaterBody, AddWaterResponse } from "../types";
import type { AddWaterInput } from "../types";
import { toast } from "sonner";

function toAddWaterBody(input: AddWaterInput): AddWaterBody {
  return {
    amount: Math.round(input.amount),
    dateAndTime: input.dateAndTime,
  };
}

export function useAddWater(options?: {
  onSuccess?: (data: AddWaterResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<AddWaterResponse, Error, AddWaterInput>({
    mutationFn: (input: AddWaterInput) =>
      addWater(toAddWaterBody(input)),
    onSuccess: (_data) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "water",
      });
      toast.success("Water intake added successfully");
      options?.onSuccess?.(_data);
    },
  });
}
