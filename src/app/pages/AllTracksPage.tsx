import { fetchTracks } from "../../api/fetchTracks";
import { useQuery } from "@tanstack/react-query";
import { Tracks } from "../../types/database";
import { Link } from "react-router-dom";

export function AllTracksPage() {
  const { data: tracks, isLoading } = useQuery<Tracks>({
    queryKey: ["tracks"],
    queryFn: fetchTracks,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="flex flex-col justify-center">
      {!isLoading &&
        tracks?.map((track) => (
          <Link to={`/tracks/${track.id}`}>{track.name}</Link>
        ))}
    </div>
  );
}
