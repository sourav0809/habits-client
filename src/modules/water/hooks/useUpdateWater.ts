import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWater } from "../api";
import type {
  UpdateWaterBody,
  UpdateWaterResponse,
} from "../types";
import type { UpdateWaterInput } from "../types";
import { toast } from "sonner";

function toUpdateWaterBody(input: UpdateWaterInput): UpdateWaterBody {
  const body: UpdateWaterBody = {};
  if (input.amount !== undefined) body.amount = Math.round(input.amount);
  if (input.dateAndTime !== undefined) body.dateAndTime = input.dateAndTime;
  return body;
}

export function useUpdateWater(options?: {
  onSuccess?: (data: UpdateWaterResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateWaterResponse,
    Error,
    { id: string; body: UpdateWaterInput }
  >({
    mutationFn: ({ id, body }) =>
      updateWater(id, toUpdateWaterBody(body)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "water",
      });
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "dashboard",
      });
      toast.success("Water intake updated successfully");
      options?.onSuccess?.(data);
    },
  });
}
