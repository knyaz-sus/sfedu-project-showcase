import { AppLink } from "@/components/AppLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Toggle } from "@/components/Toggle";
import { headerPages } from "@/constants/buttonVariants";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  return (
    <header className="flex  justify-center pl-5 pr-5 pt-2 pb-2 m-0">
      <nav className="flex-auto">
        <ul className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <li className="mr-2">
              <Link to="/">
                <img className="max-w-10 max-h-10" src="/logo.png" alt="logo" />
              </Link>
            </li>
            {headerPages.map((page) => {
              const className =
                location.pathname !== page.link ? "text-muted-foreground" : "";
              return (
                <li key={page.link}>
                  <AppLink
                    className={className}
                    link={page.link}
                    title={page.title}
                  />
                </li>
              );
            })}
          </div>
          <div className="flex items-center gap-6">
            <li>
              <a href="">Войти</a>
            </li>
            <li>
              <Toggle>dock</Toggle>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
