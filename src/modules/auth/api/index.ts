import { authApiClient } from "@/lib/api/auth-client";
import type {
  LoginInput,
  LoginResponse,
  MeResponse,
  RegisterInput,
  RegisterResponse,
} from "../types";
import {
  loginResponseSchema,
  meResponseSchema,
  registerResponseSchema,
} from "../types";
import { setStoredToken } from "../helpers";

export async function registerApi(
  input: RegisterInput
): Promise<RegisterResponse> {
  const { data } = await authApiClient.post<RegisterResponse>(
    "/register",
    input
  );
  registerResponseSchema.parse(data);
  return data;
}

export async function loginApi(input: LoginInput): Promise<LoginResponse> {
  const { data } = await authApiClient.post<LoginResponse>("/login", input);
  loginResponseSchema.parse(data);
  if (data.data.token) {
    setStoredToken(data.data.token);
  }
  return data;
}

export async function meApi(): Promise<MeResponse> {
  const { data } = await authApiClient.get<MeResponse>("/me");
  meResponseSchema.parse(data);
  return data;
}
