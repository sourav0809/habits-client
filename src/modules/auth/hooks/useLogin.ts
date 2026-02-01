import { useMutation } from "@tanstack/react-query";
import { logIn } from "../api";
import type { LoginInput } from "../types";
import { setAuthToken } from "@/utils";

export function useLogin() {
  return useMutation({
    mutationFn: (input: LoginInput) => logIn(input),
    onSuccess: (data) => {
      if (data?.data?.token) {
        setAuthToken(data?.data?.token);
      }
    },
  });
}
