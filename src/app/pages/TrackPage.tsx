import { useQuery } from "@tanstack/react-query";
import { fetchTrack } from "@/api/fetchTrack";
import { ProjectCards } from "@/components/Card/ProjectCards";
import { Projects } from "@/types/database";
import { useParams } from "react-router-dom";

export function TrackPage() {
  const { id } = useParams();
  const { data: trackProjects, isLoading } = useQuery<Projects | undefined>({
    queryKey: [`track-${id}`],
    queryFn: () => fetchTrack(Number(id)),
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="m-5 text-center">
            Трек {trackProjects ? trackProjects[0].track.name : ""}
          </h1>
          <ProjectCards projects={trackProjects} />
        </>
      )}
    </div>
  );
}
