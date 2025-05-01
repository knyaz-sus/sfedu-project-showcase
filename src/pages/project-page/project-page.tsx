import { useParams } from "react-router-dom";
import { ScreenshotsCarousel } from "./components/screenshots-carousel";
import { Badge } from "@/shared/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Separator } from "@/shared/ui/separator";
import { useGetProject } from "./api/hooks/use-get-project";
import { Spinner } from "@/shared/ui/spinner";
import { Link } from "lucide-react";

export function ProjectPage() {
  const { id } = useParams();
  const { data: project, isPending } = useGetProject(id as string);
  if (isPending) {
    return (
      <div className="flex items-center justify-center absolute top-0 left-0 h-svh -z-10 w-full bg-background">
        <Spinner className="relative z-50 text-foreground" size={40} />
      </div>
    );
  }
  if (!project) return null;
  return (
    <div className="flex flex-col justify-center mx-auto gap-2 max-w-7xl">
      <div className="flex flex-col max-w-[75%]">
        <h1 className="w-full mb-1">{project.title}</h1>
      </div>
      <Separator className="mb-2" />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-auto flex-col">
          <ScreenshotsCarousel screenshots={project.screenshots} />
          <p>
            Наш проект — это кроссплатформенное решение, включающее в себя
            мобильное и веб-приложение, разработанное с использованием
            современных технологий и подходов к программированию. <br />
            Фронтенд реализован на React с использованием TypeScript, что
            обеспечивает строгую типизацию и упрощает поддержку кода. Бэкенд
            построен на Node.js с использованием Express, что позволяет быстро
            обрабатывать запросы и предоставлять API для взаимодействия
            клиентских приложений с сервером.
            <br /> Для хранения данных используется PostgreSQL, выбранная за её
            надежность и широкие возможности работы с реляционными данными.
            Архитектура приложения модульная, с четким разделением
            ответственности между слоями: маршрутизация, логика работы с данными
            и обработка запросов организованы отдельно. В проекте также
            используется автоматизированная система сборки и тестирования через
            CI/CD, что минимизирует вероятность ошибок при развертывании.
            <br />
            Горячая перезагрузка включена для ускорения разработки, а весь код
            проходит через линтеры и статический анализ, чтобы поддерживать
            высокие стандарты качества. Проект ориентирован на масштабируемость,
            поэтому добавление новых функций или изменение существующих не
            требует значительных усилий. Мы придерживаемся принципов чистой
            архитектуры, чтобы код оставался понятным и легко поддерживаемым в
            будущем.
          </p>
        </div>
        <div className="flex-1 min-w-[25%] flex flex-col gap-2 items-start">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag.id}>{tag.name}</Badge>
              ))}
            </div>
            <div className="flex gap-2 text-sm">
              <span>
                {project.track.name} {project.date.name}
              </span>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <Link size={16} />
              <div className="flex flex-col">
                <a href="">{project.repo}</a>
              </div>
            </div>
          </div>
          <ul className="flex flex-col w-full gap-1">
            <h2 className="text-sm">Участники проекта</h2>
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
            <span className="mt-2">Оценка проекта: {project.grade}/100</span>
          </ul>
        </div>
      </div>
    </div>
  );
}
