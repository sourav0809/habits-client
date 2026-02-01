import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/keys";
import { deleteFood } from "../api";
import type { DeleteFoodResponse } from "../types";
import { toast } from "sonner";

export function useDeleteFood(options?: {
  onSuccess?: (data: DeleteFoodResponse) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation<DeleteFoodResponse, Error, string>({
    mutationFn: (id: string) => deleteFood(id),
    onSuccess: (data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.food.list });
      toast.success("Food deleted successfully");
      options?.onSuccess?.(data);
    },
  });
}
