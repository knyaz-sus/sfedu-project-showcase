import { getAllTracks } from "../get-all-tracks";
import { usePersistentQuery } from "@/shared/hooks/use-persistent-query";

export function useGetAllTracks() {
  return usePersistentQuery({
    queryKey: ["tracks"],
    queryFn: getAllTracks,
  });
}
