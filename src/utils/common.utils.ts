import type { AxiosError } from "axios";


/**
 * Get the first letter of the name
 * @param name - The name to get the first letter of
 * @returns The first letter of the name
 */
export const getFirstLetter = (name: string) => {
  return name.charAt(0).toUpperCase();
};


/**
 * Get the error message from the API error response
 * @param error - The error object
 * @returns The error message or null if not found
 */
export function getApiErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;
  const err = error as AxiosError<{ message?: string }>;
  const message = err.response?.data?.message;
  return typeof message === "string" ? message : null;
}
