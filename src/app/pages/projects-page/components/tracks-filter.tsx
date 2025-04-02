import { useMemo } from "react";
import { Filter } from "./filter";
import { useQuery } from "@tanstack/react-query";
import { fetchTracks } from "@/api/fetch-tracks";

export function TracksFilter() {
  const { data: tracks, isLoading } = useQuery({
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
      emptyFilterText="Треки не найдены"
      placeholder="Фильтр по треку..."
      entities={tracksFilter}
      isLoading={isLoading}
      name="trackFilter"
    />
  );
}
