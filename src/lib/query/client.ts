import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface QueryError {
  message?: string;
  status?: number;
  code?: string;
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
    status?: number;
    statusText?: string;
  };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount, error: QueryError) => {
        if (error?.status && error.status >= 400 && error.status < 500) {
          return false;
        }
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    },
    mutations: {
      onError: (error: QueryError) => {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          'An error occurred';
        toast.error(message);
      }
    }
  }
});