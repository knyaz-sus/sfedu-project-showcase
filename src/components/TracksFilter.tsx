import { useMemo } from "react";
import { Filter } from "./Filter";
import { Tracks } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import { fetchTracks } from "@/api/fetchTracks";

export function TracksFilter() {
  const { data: tracks, isLoading } = useQuery<
    Tracks | undefined
  >({
    queryKey: ["tracks"],
    queryFn: fetchTracks,
    refetchOnWindowFocus: false,
  });
  const tracksFilter = useMemo(
    () =>
      tracks?.map((track) => {
        const { name, id } = track;
        return { name, id };
      }),
    [tracks]
  );
  return (
    <Filter
      errorMessage="Треки не найдены"
      placeholder="Введите трек"
      entities={tracksFilter}
      isLoading={isLoading}
    />
  );
}