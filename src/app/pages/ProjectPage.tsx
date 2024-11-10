import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Project } from "../../types/database";
import { fetchProject } from "../../api/fetchProject";

export function ProjectPage() {
  const { id } = useParams();
  const { data: project, isLoading: isProjectLoading } = useQuery<Project>({
    queryKey: [`project-${id}`],
    queryFn: () => fetchProject(Number(id)),
    refetchOnWindowFocus: false,
  });
  return isProjectLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>{project?.title}</h1>
      <h2>{project?.track.name}</h2>
      <p>{project?.description}</p>
      <div className="flex flex-col">
        {project?.users.map((user) => (
          <span>{user.fullName}</span>
        ))}
      </div>
      <a href="https://example.com/">Репозиторий</a>
      <div className="flex">
        {project?.screenshots.map((screenshot) => (
          <img key={screenshot} src={screenshot} alt="" />
        ))}
      </div>
      <span>Оценка проета: {project?.grade}</span>
    </div>
  );
}
