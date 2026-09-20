import { QueryClient } from '@tanstack/react-query'

// One shared cache for the whole app. Data stays "fresh" for a minute, so moving
// between pages (or coming back to one) shows instantly instead of refetching.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
