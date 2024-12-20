import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchProject } from "@/api/fetchProject";
import { Loading } from "@/components/Loading";
import { ScreenshotsCarousel } from "./components/ScreenshotsCarousel";
import { Badge } from "@/components/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { Separator } from "@/components/Separator";

export function ProjectPage() {
  const { id } = useParams();
  const { data: project, isLoading } = useQuery({
    queryKey: [`project-${id}`],
    queryFn: () => fetchProject(Number(id)),
    refetchOnWindowFocus: false,
  });
  if (!project) return null;
  return (
    <Loading isLoading={isLoading}>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col order-2 md:order-1 items max-w-none md:max-w-lg flex-1">
          <ScreenshotsCarousel screenshots={project.screenshots} />
          <ul className="flex flex-col w-full gap-2">
            <h2 className="text-base mb-2">Участники проекта</h2>
            <Separator />
            {project.users.map((user) => (
              <>
                <li className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage />
                    <AvatarFallback>
                      {user.fullName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span key={user.id}>{user.fullName}</span>
                </li>
                <Separator />
              </>
            ))}

            <span>
              Оценка проекта: <strong>{project.grade}</strong>
            </span>
            <Separator />
          </ul>
        </div>
        <div className="flex-1 flex flex-col order-1 md:order-2  gap-2 items-start">
          <div className="flex flex-col gap-4 mb-2">
            <h1>{project.title}</h1>
            <div className="flex gap-2">
              <Badge variant="secondary">{project.track.name}</Badge>
              {project.tags.map((tag) => (
                <Badge variant="secondary">{tag.name}</Badge>
              ))}
            </div>
          </div>
          <p>
            Проект Мехмата «Витрина проектов» — это веб-платформа для студентов
            мехмата, которые участвуют в проектной деятельности, а также для
            руководителей проектов. Основная цель сервиса — возможность для
            студентов загружать материалы по своим проектам: описания и
            медиаматериалы, а также отображать эти проекты для всех
            пользователей платформы. В фронтенд части проекта используется
            следующий стек:
            <br /> 1. React – основная библиотека для построения интерфейса.
            <br />
            2. Tanstack Query – библиотека для управления асинхронным
            состоянием.
            <br /> 3. Tailwind CSS – основное решение для стилизации. <br />
            4. Shadcn и Radix – решения, предоставляющие наборы готовых
            компонентов. <br />
            Реализованы следующие страницы: <br />
            1. home (/) <br />
            2. /projects <br />
            3. /project/:id Фронтенд приложение может аутентифицироваться через
            бекенд серсис, реализованы основные CRUD операции.
          </p>
        </div>
      </div>
    </Loading>
  );
}
