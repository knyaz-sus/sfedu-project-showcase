import { Button } from "@/shared/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Link, useLocation } from "react-router";
import { Separator } from "@/shared/ui/separator";

/* eslint-disable no-irregular-whitespace */
export function Footer() {
  const location = useLocation();
  return (
    <>
      <Separator />
      <footer className="flex justify-center py-4 px-5 w-full">
        <div className="flex flex-col md:justify-center md:flex-row gap-5 lg:px-0 max-w-7xl">
          <div className="flex-1">
            <h2 className="mb-2">О проектной деятельности</h2>
            <p>
              Проектная деятельность — это учебная дисциплина, где студенты
              работают в командах над реальными задачами в области
              информационных технологий.
            </p>
            <p className="mt-1">
              Цель — овладеть командной разработкой программных решений в
              контексте профессиональной и научно-исследовательской практики.
            </p>
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="mb-2">Контактная информация</h2>
            <div className="flex flex-col gap-2">
              <span>mmcs@sfedu.ru</span>
              <span>+7 (863) 29-75-111</span>
              <span>344090, Ростов-​на-​Дону, ул. Мильчакова, 8а</span>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="mb-2">Социальные сети</h2>
            <div className="flex flex-col gap-2">
              <a className="underline w-fit" href="https://mmcs.sfedu.ru/">
                Официальный сайт
              </a>
              <a
                className="underline w-fit"
                href="https://vk.com/mmcs.official"
              >
                Группа ВКонтакте
              </a>
            </div>
          </div>
          <div className="flex md:flex-col gap-4 justify-between items-center pb-2">
            <Button variant="outline" asChild>
              <Link
                to={location.pathname.includes("/admin") ? "/" : "/admin"}
                className="max-w-44 xs:max-w-none overflow-hidden"
              >
                <span className="truncate block">
                  {location.pathname.includes("/admin")
                    ? "Перейти в основное приложение"
                    : "Войти как администратор"}
                </span>
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </>
  );
}
