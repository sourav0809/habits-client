import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api";
import type { LoginInput } from "../types";

export function useLogin() {
  return useMutation({
    mutationFn: (input: LoginInput) => loginApi(input),
  });
}
