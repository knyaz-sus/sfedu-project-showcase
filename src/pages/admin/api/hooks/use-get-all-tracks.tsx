import { API_URL } from "@/shared/api/constants";
import { useQuery } from "@tanstack/react-query";

export function useGetAllTracks() {
  return useQuery({
    queryKey: ["tracks"],
    queryFn: () => fetch(`${API_URL}/tracks`).then((res) => res.json()),
  });
}
