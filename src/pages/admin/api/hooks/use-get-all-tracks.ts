import { useQuery } from "@tanstack/react-query";
import { getAllTracks } from "../get-all-tracks";

export function useGetAllTracks() {
  return useQuery({
    queryKey: ["tracks"],
    queryFn: getAllTracks,
  });
}
