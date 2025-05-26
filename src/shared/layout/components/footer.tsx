import { Button } from "@/shared/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/shared/ui/separator";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";

/* eslint-disable no-irregular-whitespace */
export function Footer() {
  const isMobile = useIsMobile();
  const location = useLocation();
  return (
    <>
      <Separator />
      <footer className="flex flex-col md:flex-row gap-5 py-4 px-4 lg:px-0 max-w-7xl mx-auto">
        <div className="flex-1">
          <h2 className="mb-2">О проектной деятельности</h2>
          <p>
            Проектная деятельность (ПД) — это дисциплина, направленная на
            получение практического опыта по специальности. Задача этого
            предмета — дать возможность студентам решить какую-либо проблему, с
            которой они могут столкнуться после окончания университета.
          </p>
        </div>
        <div className="flex flex-col flex-1">
          <h2 className="mb-2">Контактная информация</h2>
          <div className="flex flex-col gap-2">
            <span>email@example.ru</span>
            <span>+7 (999) 123-45-67</span>
            <span>г. Ростов-​на-​Дону, ул. Мильчакова, 8а</span>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <h2 className="mb-2">Социальные сети</h2>
          <div className="flex flex-col gap-2">
            <a className="underline" href="https://mmcs.sfedu.ru/">
              Официальный сайт
            </a>
            <a className="underline" href="https://vk.com/mmcs.official">
              Vk
            </a>
          </div>
        </div>
        <div className="flex md:flex-col gap-4 justify-between items-center pb-2">
          <Button size={isMobile ? "sm" : "default"} variant="outline">
            {location.pathname.includes("/admin") ? (
              <Link className="max-w-32 sm:max-w-none truncate" to="/">
                Перейти в основное приложение
              </Link>
            ) : (
              <Link className="max-w-32 sm:max-w-none truncate" to="/admin">
                Войти как администратор
              </Link>
            )}
          </Button>
          <ThemeToggle />
        </div>
      </footer>
    </>
  );
}
