import { useMutation } from "@tanstack/react-query";
import { logIn } from "../api";
import type { LoginInput } from "../types";

export function useLogin() {
  return useMutation({
    mutationFn: (input: LoginInput) => logIn(input),
  });
}
