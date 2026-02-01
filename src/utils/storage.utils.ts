import { LOCAL_STORAGE_KEYS } from "@/constants";


/**
 * Get the authentication token from the local storage
 * @returns The authentication token or null if not found
 */
export function getAuthToken(): string | null {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
}


/**
 * Set the authentication token in the local storage
 * @param token - The authentication token
 */
export function setAuthToken(token: string): void {
  localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
}


/**
 * Clear the local storage
 */
export function clearLocalStorage(): void {
  localStorage.clear()
}

/**
 * Store an item in the local storage
 * @param key - The key to store the item
 * @param value - The value to store
 */
export function storeItemToLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get an item from the local storage
 * @param key - The key to get the item
 * @returns The item or null if not found
 */
export function getItemFromLocalStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  if (typeof item === 'string') {
    return JSON.parse(item);
  }
  return item;
}


/**
 * Remove an item from the local storage
 * @param key - The key to remove the item
 */
export function removeItemFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}
