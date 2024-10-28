import { useQuery } from "@tanstack/react-query";
import { fetchTrack } from "../../api/fetchTrack";
import { Cards } from "../../components/Card/Cards";
import { Projects } from "../../types/database";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ProjectView } from "../../types/types";
import { Button } from "../../components/Button/Button";

export function TrackPage() {
  const { id } = useParams();
  const [view, setView] = useState<ProjectView>("grid");
  const { data: trackProjects, isLoading } = useQuery<Projects>({
    queryKey: ["track-${id}"],
    queryFn: () => fetchTrack(Number(id)),
    refetchOnWindowFocus: false,
  });
  if (id === null || id === undefined) return null;
  const handleGrid = () => setView("grid");
  const handleList = () => setView("list");
  return (
    <div>
      <div className="flex gap-4">
        <Button handleClick={handleGrid}>Плитки</Button>
        <Button handleClick={handleList}>Лист</Button>
      </div>
      <h1 className="m-5 text-center">
        Трек {trackProjects ? trackProjects[0]?.trackName : ""}
      </h1>
      {!isLoading && <Cards view={view} projects={trackProjects} />}
    </div>
  );
}
