import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { API_URL } from "@/shared/api/constants";
import { useAuth } from "@/shared/hooks/use-auth";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { FavoriteProjectCard } from "./favorite-project-card";

export function HomePage() {
  const { isAuthLoading, authUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 max-w-7xl w-full">
      <section className="flex items-center justify-center min-h-[calc(100svh-5.75rem)] py-2">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Badge variant="outline">Учись на мехмате, будь лучшим!</Badge>
            <h1 className="my-4 text-pretty text-4xl font-bold xl:text-6xl ">
              Витрина проектов Мехмата ЮФУ
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground xl:text-xl">
              Мехмат ЮФУ - структурное подразделение Южного федерального
              университета
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row md:justify-start">
              <Button asChild className="w-full sm:w-auto">
                {!isAuthLoading && authUser ? (
                  <Link to="/project-editor">Загрузить проект</Link>
                ) : (
                  <a
                    onClick={() => navigate("/login", { replace: true })}
                    href={`${API_URL}/oauth2/authorization/azure`}
                  >
                    Загрузить проект
                  </a>
                )}
              </Button>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <img
              src="/img/placeholder.svg"
              alt="Изображение проекта"
              className="w-full aspect-video object-center rounded-md object-cover"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col gap-8">
          <div className="lg:max-w-sm">
            <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              Избранные проекты последнего семестра
            </h2>
            <Link
              to="/projects"
              className="group flex items-center text-xs font-medium md:text-base lg:text-lg"
            >
              Перейти ко всем проектам
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            <FavoriteProjectCard
              title="Игровая экосистема с использованием компьютерного зрения:
                  распознавание движений для управления персонажем в виртуальном
                  мире."
              description="Наш проект — это кроссплатформенное решение, включающее в себя
                  мобильное и веб-приложение, разработанное с использованием
                  современных технологий и подходов к программированию. Фронтенд
                  реализован на React с использованием TypeScript, что
                  обеспечивает строгую типизацию и упрощает поддержку кода.
                  Бэкенд построен на Node.js с использованием Express, что
                  позволяет быстро обрабатывать запросы и предоставлять API для
                  взаимодействия клиентских приложений с сервером."
              index={1}
            />
            <FavoriteProjectCard
              title="Веб-платформа для обучения программированию через создание
                  собственных текстовых квестов и их визуализацию."
              description="Promise — это отличительная особенность JavaScript как
                  асинхронного языка программирования. Нравится вам это или нет,
                  понять его в любом случае придется. В этой статье автор
                  приводит 10 примеров кода с Promise, начиная от базового
                  уровня заканчивая продвинутым. Готовы? Начнем!"
              index={2}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
