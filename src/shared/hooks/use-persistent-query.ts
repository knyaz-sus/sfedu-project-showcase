import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function usePersistentQuery<T>(options: UseQueryOptions<T>) {
  const { data, isLoading, isPending, isError } = useQuery({
    ...options,
    // An hour
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
  return { data, isError, isLoading, isPending };
}
