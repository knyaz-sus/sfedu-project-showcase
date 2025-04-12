import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { API_URL } from "@/shared/api/constants";
import { useAuth } from "@/shared/hooks/use-auth";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function HomePage() {
  const { isAuthLoading, authUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4">
      <section className="py-16">
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Badge variant="outline">✨ Учись на мехмате, будь лучшим!</Badge>
              <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
                Витрина проектов Мехмата ЮФУ
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                Мехмат ЮФУ - структурное подразделение Южного федерального
                университета
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Button asChild className="w-full sm:w-auto">
                  {!isAuthLoading && authUser ? (
                    <Link to="/account">Загрузить проект</Link>
                  ) : (
                    <a
                      onClick={() => navigate("/login")}
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
                src="/img/img7.jpg"
                alt="Hero section demo image showing interface components"
                className="w-full aspect-video object-center rounded-md object-cover"
              />
              <span className="opacity-60">
                Изображение: Роман Филоненко ФИИТ-МИ-2
              </span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container flex flex-col gap-16 lg:px-16">
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
            <div className="flex flex-col overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
              <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
                <img
                  src="/img/img5.png"
                  alt="Feature 1"
                  className="aspect-[16/9] h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                  Игровая экосистема с использованием компьютерного зрения:
                  распознавание движений для управления персонажем в виртуальном
                  мире.
                </h3>
                <p className="text-muted-foreground lg:text-lg">
                  Наш проект — это кроссплатформенное решение, включающее в себя
                  мобильное и веб-приложение, разработанное с использованием
                  современных технологий и подходов к программированию. Фронтенд
                  реализован на React с использованием TypeScript, что
                  обеспечивает строгую типизацию и упрощает поддержку кода.
                  Бэкенд построен на Node.js с использованием Express, что
                  позволяет быстро обрабатывать запросы и предоставлять API для
                  взаимодействия клиентских приложений с сервером.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
              <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                  Веб-платформа для обучения программированию через создание
                  собственных текстовых квестов и их визуализацию.
                </h3>
                <p className="text-muted-foreground lg:text-lg">
                  Promise — это отличительная особенность JavaScript как
                  асинхронного языка программирования. Нравится вам это или нет,
                  понять его в любом случае придется. В этой статье автор
                  приводит 10 примеров кода с Promise, начиная от базового
                  уровня заканчивая продвинутым. Готовы? Начнем!
                </p>
              </div>
              <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
                <img
                  src="/img/img6.png"
                  alt="Feature 2"
                  className="aspect-[16/9] h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
