import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api";
import type { RegisterInput } from "../types";

export function useRegister() {
  return useMutation({
    mutationFn: (input: RegisterInput) => registerApi(input),
  });
}
