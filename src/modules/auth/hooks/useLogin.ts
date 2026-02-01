import { useMutation } from "@tanstack/react-query";
import { logIn } from "../api";
import type { LoginInput, LoginResponse } from "../types";
import { setAuthToken } from "@/utils";

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: (input: LoginInput) => logIn(input),
    onSuccess: (data) => {
      setAuthToken(data?.token)
    },
  });
}
