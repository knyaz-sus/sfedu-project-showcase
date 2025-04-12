import { useMemo } from "react";
import { Filter } from "./filter";
import { useGetAllTracks } from "../api/hooks/use-get-all-tracks";

export function TracksFilter() {
  const { tracks, isLoading } = useGetAllTracks();
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
