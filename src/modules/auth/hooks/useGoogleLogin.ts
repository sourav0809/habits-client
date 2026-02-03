import { useMutation } from "@tanstack/react-query";
import { googleLogin } from "../api";
import type { GoogleLoginInput, LoginResponse } from "../types";
import { setAuthToken } from "@/utils";

export function useGoogleLogin() {
  return useMutation<LoginResponse, Error, GoogleLoginInput>({
    mutationFn: (input: GoogleLoginInput) => googleLogin(input),
    onSuccess: (data) => {
      setAuthToken(data?.token);
    },
  });
}
