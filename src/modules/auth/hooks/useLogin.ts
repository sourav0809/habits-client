import { useMutation } from "@tanstack/react-query";
import { logIn } from "../api";
import type { LoginInput, LoginResponse } from "../types";
import { getApiErrorMessage, setAuthToken } from "@/utils";
import { toast } from "sonner";

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: (input: LoginInput) => logIn(input),
    onSuccess: (data) => {
      setAuthToken(data?.token)
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
    }
  });
}
