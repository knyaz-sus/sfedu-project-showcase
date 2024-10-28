import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Project, Users } from "../../types/database";
import { fetchProject } from "../../api/fetchProject";
import { fetchUsersInProject } from "../../api/fetchUsersInProject";

export function ProjectPage() {
  const { id } = useParams();
  const { data: project, isLoading: isProjectLoading } = useQuery<Project>({
    queryKey: [`project-${id}`],
    queryFn: () => fetchProject(Number(id)),
  });
  const { data: team, isLoading: isTeamLoading } = useQuery<Users>({
    queryKey: [`team-${project?.id}`],
    queryFn: () => fetchUsersInProject(Number(id)),
  });
  return isProjectLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>{project?.title}</h1>
      <h2>{project?.trackName}</h2>
      <div className="flex flex-col">
        {isTeamLoading ? (
          <div>Loading...</div>
        ) : (
          team?.map((member) => <span key={member.id}>{member.fullName}</span>)
        )}
      </div>
      <a href="https://example.com/">Репозиторий</a>
      <div className="flex">
        {project?.screenshots.map((screenshot) => (
          <img src={screenshot} alt="" />
        ))}
      </div>
      <span>Оценка проета: {project?.grade}</span>
    </div>
  );
}
