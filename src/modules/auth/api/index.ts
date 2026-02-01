import { apiClient } from "@/lib/api/client";
import type {
  LoginInput,
  LoginResponse,
  MeResponse,
  RegisterInput,
  RegisterResponse,
} from "../types";
import { setAuthToken } from "@/utils";

export async function register(
  input: RegisterInput
): Promise<RegisterResponse> {
  const { data } = await apiClient.post<RegisterResponse>(
    "/register",
    input
  );
  return data;
}

/**
 * Log in a user
 * @param input - The login input
 * @returns The login response
 */
export async function logIn(input: LoginInput): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>("/login", input);
  if (data.data.token) {
    setAuthToken(data.data.token);
  }
  return data;
}

/**
 * Get the current user
 * @returns The current user
 */
export async function getCurrentUser(): Promise<MeResponse> {
  const { data } = await apiClient.get<MeResponse>("/me");
  return data;
}
