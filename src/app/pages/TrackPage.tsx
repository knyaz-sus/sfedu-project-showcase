import { useQuery } from "@tanstack/react-query";
import { fetchTrack } from "../../api/fetchTrack";
import { ProjectCards } from "../../components/Card/ProjectCards";
import { Projects } from "../../types/database";
import { useParams } from "react-router-dom";

export function TrackPage() {
  const { id } = useParams();
  const { data: trackProjects, isLoading } = useQuery<Projects>({
    queryKey: ["track-${id}"],
    queryFn: () => fetchTrack(Number(id)),
    refetchOnWindowFocus: false,
  });
  if (id === null || id === undefined) return null;

  return (
    <div>
      <div className="flex gap-4"></div>
      <h1 className="m-5 text-center">
        Трек {trackProjects ? trackProjects[0]?.trackName : ""}
      </h1>
      {!isLoading && <ProjectCards projects={trackProjects} />}
    </div>
  );
}
