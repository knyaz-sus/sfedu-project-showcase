import { useParams } from "react-router-dom";
import { Loading } from "@/shared/ui/loading";
import { ScreenshotsCarousel } from "./components/screenshots-carousel";
import { Badge } from "@/shared/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Separator } from "@/shared/ui/separator";
import { useGetProject } from "./api/hooks/use-get-project";

export function ProjectPage() {
  const { id } = useParams();
  const { project, isLoading } = useGetProject(id as string);
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
                <Badge variant="secondary" key={tag.id}>
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
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
      </div>
    </Loading>
  );
}
