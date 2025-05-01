import { ThemeToggle } from "./theme-toggle";

/* eslint-disable no-irregular-whitespace */
export function Footer() {
  return (
    <footer className="flex flex-col md:flex-row gap-5 py-4 px-4 lg:px-0 max-w-7xl mx-auto">
      <div className="flex-1">
        <h2 className="mb-2">О проектной деятельности</h2>
        <p>
          Проектная деятельность (ПД) — это дисциплина, направленная на
          получение практического опыта по специальности. Задача этого предмета
          — дать возможность студентам решить какую-либо проблему, с которой они
          могут столкнуться после окончания университета.
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
      <div className="flex justify-end items-start pb-2">
        <ThemeToggle />
      </div>
    </footer>
  );
}
