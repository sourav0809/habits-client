import type { AxiosError } from "axios";

const AUTH_TOKEN_KEY = "auth_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearStoredToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

/** Extract error message from API error response (data.message or fallback) */
export function getApiErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;
  const err = error as AxiosError<{ message?: string }>;
  const message = err.response?.data?.message;
  return typeof message === "string" ? message : null;
}
