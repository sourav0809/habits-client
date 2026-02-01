import { useMutation } from "@tanstack/react-query";
import { register } from "../api";
import type { RegisterInput, RegisterResponse } from "../types";
import { setAuthToken } from "@/utils";

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterInput>({
    mutationFn: (input: RegisterInput) => register(input),
    onSuccess: (data) => {
      setAuthToken(data?.token);
    },
  });
}
