import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { envConfig } from "@/config/envConfig";
import { LOCAL_STORAGE_KEYS } from "@/constants";

/**
 * ================================================================
 * Types
 * ================================================================
 */

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T;
  pagination: PaginationMeta | null;
}

/**
 * ================================================================
 * Custom API Error
 * ================================================================
 */

export class ApiError extends Error {
  status?: number;
  response?: AxiosError["response"];

  constructor(message: string, status?: number, response?: AxiosError["response"]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.response = response;
  }
}

/**
 * ================================================================
 * Axios instance
 * ================================================================
 */

const axiosClient: AxiosInstance = axios.create({
  baseURL: envConfig.api.url,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * ================================================================
 * Request interceptor
 * ================================================================
 */

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // FormData handling
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
      config.timeout = 0;
    }

    return config;
  }
);

/**
 * ================================================================
 * Response interceptor (errors only)
 * ================================================================
 */

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    const status = error.response?.status;
    const data = error.response?.data;

    const message =
      data?.message ||
      data?.error ||
      error.message ||
      "Something went wrong";

    // Auth failure → clear token
    if (status === 401 || status === 403) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      window.location.href = "/login";
    }

    return Promise.reject(new ApiError(message, status, error.response));
  }
);

/**
 * ================================================================
 * Data normalization helpers
 * ================================================================
 */

const extractData = <T>(response: AxiosResponse): T => {
  const raw = response.data;

  // { data: { data, pagination } }
  if (
    raw &&
    typeof raw === "object" &&
    "data" in raw &&
    typeof raw.data === "object" &&
    raw.data !== null &&
    "data" in raw.data
  ) {
    return raw.data.data as T;
  }

  // { data }
  if (raw && typeof raw === "object" && "data" in raw) {
    return raw.data as T;
  }

  // plain response
  return raw as T;
};

const extractPaginatedData = <T>(
  response: AxiosResponse
): PaginatedResponse<T> => {
  const raw = response.data;

  return {
    data: raw?.data?.data ?? raw?.data,
    pagination: transformPagination(raw?.data?.pagination ?? raw?.pagination)
  };
};

const transformPagination = (pagination: unknown): PaginationMeta | null => {
  if (!pagination || typeof pagination !== "object") return null;

  const p = pagination as Record<string, unknown>;

  if ("page" in p && "size" in p && "total" in p) {
    const page = Number(p.page) || 0;
    const limit = Number(p.size) || 10;
    const total = Number(p.total) || 0;

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    };
  }

  return null;
};

/**
 * ================================================================
 * Public API (USE THIS EVERYWHERE)
 * ================================================================
 */

export const api = {
  get: async <T>(url: string, params?: unknown): Promise<T> => {
    const res = await axiosClient.get(url, { params });
    return extractData<T>(res);
  },

  getPaginated: async <T>(
    url: string,
    params?: unknown
  ): Promise<PaginatedResponse<T>> => {
    const res = await axiosClient.get(url, { params });
    return extractPaginatedData<T>(res);
  },

  post: async <T, B = unknown>(url: string, body?: B): Promise<T> => {
    const res = await axiosClient.post(url, body);
    return extractData<T>(res);
  },

  put: async <T, B = unknown>(url: string, body: B): Promise<T> => {
    const res = await axiosClient.put(url, body);
    return extractData<T>(res);
  },

  patch: async <T, B = unknown>(url: string, body?: B): Promise<T> => {
    const res = await axiosClient.patch(url, body);
    return extractData<T>(res);
  },

  delete: async <T>(url: string, body?: unknown): Promise<T> => {
    const res = await axiosClient.delete(url, { data: body });
    return extractData<T>(res);
  }
};
