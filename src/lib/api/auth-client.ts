import axios, { type AxiosInstance } from "axios";

const API_ORIGIN =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_AUTH_API_URL
    ? String(import.meta.env.VITE_AUTH_API_URL)
    : "";
const AUTH_BASE_URL = `${API_ORIGIN}/auth`.replace(/\/\/auth$/, "/auth") || "/auth";

export const authApiClient: AxiosInstance = axios.create({
  baseURL: AUTH_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

authApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authApiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
