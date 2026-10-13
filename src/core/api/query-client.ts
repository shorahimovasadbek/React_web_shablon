import { QueryClient } from '@tanstack/react-query';
import { ApiError } from './api-error';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      // 4xx xatolarda qayta urinish ma'nosiz
      retry: (count, e) => !(e instanceof ApiError && e.status >= 400 && e.status < 500) && count < 2,
    },
  },
});
