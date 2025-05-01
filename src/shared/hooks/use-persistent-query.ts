import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const usePersistentQuery = <T>(options: UseQueryOptions<T>) => {
  return useQuery({
    ...options,
    // An hour
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};
