import { useMutation } from "@tanstack/react-query";
import { register } from "../api";
import type { RegisterInput } from "../types";
import { setAuthToken } from "@/utils";

export function useRegister() {
  return useMutation({
    mutationFn: (input: RegisterInput) => register(input),
    onSuccess: (data) => {
      if (data?.data?.token) {
        setAuthToken(data?.data?.token);
      }
    },
  });
}
