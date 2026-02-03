import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { deleteFoodConsumption } from "../api";
import type { DeleteFoodConsumptionResponse } from "../types";
import { toast } from "sonner";

export function useDeleteFoodConsumption(options?: {
  onSuccess?: (data: DeleteFoodConsumptionResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<DeleteFoodConsumptionResponse, Error, string>({
    mutationFn: (id: string) => deleteFoodConsumption(id),
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.food.list });
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "food",
      });
      toast.success("Food consumption deleted successfully");
      options?.onSuccess?.(_data);
    },
  });
}
