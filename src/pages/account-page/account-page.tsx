import { Button } from "@/shared/ui/button";
import { API_URL } from "@/shared/api/constants";
import { useAuth } from "@/shared/hooks/use-auth";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useGetUsersProjects } from "./api/hooks/use-get-users-projects";
import { ProjectCard } from "../projects-list-page/components/project-card";
import { useQueryClient } from "@tanstack/react-query";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";

export function AccountPage() {
  const { authUser, isAuthLoading } = useAuth();
  const { data: usersProjects, isPending } = useGetUsersProjects(
    authUser?.attributes.name
  );
  const queryClient = useQueryClient();

  if (!authUser && !isAuthLoading) {
    return <div>Пользователь не авторизован</div>;
  }

  const logout = () => {
    queryClient.clear();
    window.location.href = `${API_URL}/logout`;
  };

  const fallback = authUser?.attributes.name
    .split(" ")
    .slice(0, 2)
    .map((namePart) => namePart[0])
    .join("");

  return (
    <div className="flex flex-col justify-between gap-2 max-w-7xl w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-2">
        <div className="flex gap-4 items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage src={authUser?.attributes.picture} />
            <AvatarFallback className="font-semibold text-xl">
              {fallback}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1>{authUser?.attributes.name}</h1>
            <span>{authUser?.attributes.email}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/project-editor">Загрузить проект</Link>
          </Button>
          <Button variant="outline" onClick={logout}>
            Выйти
          </Button>
        </div>
      </div>
      {isPending ? (
        <FullPageSpinner />
      ) : (
        <>
          <h2 className="text-base">Ваши проекты:</h2>
          <div
            className="grid grid-cols-1 gap-6
         md:grid-cols-2 lg:grid-cols-3 mb-4"
          >
            {usersProjects?.map((project) => {
              return <ProjectCard key={project.id} {...project} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}
