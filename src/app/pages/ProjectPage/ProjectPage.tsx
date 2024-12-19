import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Project } from "@/types/database";
import { fetchProject } from "@/api/fetchProject";
import { Loading } from "@/components/Loading";
import { ScreenshotsCarousel } from "./components/ScreenshotsCarousel";

export function ProjectPage() {
  const { id } = useParams();
  const { data: project, isLoading } = useQuery<Project>({
    queryKey: [`project-${id}`],
    queryFn: () => fetchProject(Number(id)),
    refetchOnWindowFocus: false,
  });
  if (!project) return null;
  return (
    <Loading isLoading={isLoading}>
      <div className="flex pt-5 pb-3 w-full">
        <div>
          <h1>{project.title}</h1>
          <h2>{project.track.name}</h2>
          <p>{project.description}</p>
          <a href="https://example.com/">Репозиторий</a>
          <span>Оценка проекта: {project.grade}</span>
        </div>
        <div>
          <ScreenshotsCarousel screenshots={project.screenshots} />
          <div className="flex flex-col">
            {project.users.map((user) => (
              <span key={user.id}>{user.fullName}</span>
            ))}
          </div>
        </div>
      </div>
    </Loading>
  );
}
