import { getAllTracks } from "../get-all-tracks";
import { usePersistentQuery } from "@/shared/hooks/use-persistent-query";

export function useGetAllTracks() {
  const { data: tracks, isLoading } = usePersistentQuery({
    queryKey: ["tracks"],
    queryFn: getAllTracks,
  });
  return { tracks, isLoading };
}
