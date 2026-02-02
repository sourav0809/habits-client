import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWater } from "../api";
import type { DeleteWaterResponse } from "../types";
import { toast } from "sonner";

export function useDeleteWater(options?: {
  onSuccess?: (data: DeleteWaterResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<DeleteWaterResponse, Error, string>({
    mutationFn: (id: string) => deleteWater(id),
    onSuccess: (_data) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "water",
      });
      toast.success("Water intake deleted successfully");
      options?.onSuccess?.(_data);
    },
  });
}
