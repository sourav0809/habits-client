import { api } from "@/lib/api/client";
import type {
  LoginInput,
  LoginResponse,
  MeResponse,
  RegisterInput,
  RegisterResponse,
} from "../types";

export async function register(
  input: RegisterInput
): Promise<RegisterResponse> {
  return await api.post<RegisterResponse>(
    "v1/auth/register",
    input
  );

}

/**
 * Log in a user
 * @param input - The login input
 * @returns The login response
 */
export async function logIn(input: LoginInput): Promise<LoginResponse> {
  return await api.post<LoginResponse>("v1/auth/login", input);
}

/**
 * Get the current user
 * @returns The current user
 */
export async function getCurrentUser(): Promise<MeResponse> {
  return await api.get<MeResponse>("v1/auth/me");
}
