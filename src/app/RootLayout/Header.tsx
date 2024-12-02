import { Link, useLocation } from "react-router-dom";
import { AppLink } from "@/components/AppLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { headerPages } from "@/constants/buttonVariants";

export function Header() {
  const location = useLocation();
  return (
    <header className="backdrop:blur-md glass bg-gradient-to-tr shadow-sm fixed top-0 w-full z-10">
      <nav className="flex items-center justify-between flex-auto h-16 px-5">
        <ul className="flex items-center gap-5">
          <li className="mr-2">
            <Link to="/" className="flex items-center gap-2">
              <img className="max-w-11 max-h-11" src="/logo.png" alt="logo" />
            </Link>
          </li>
          {headerPages.map((page) => (
            <li key={page.link}>
              <AppLink
                className={
                  location.pathname === page.link ? "text-foreground" : ""
                }
                link={page.link}
                title={page.title}
              />
            </li>
          ))}
        </ul>
        <ul className="flex items-center gap-6">
          <li>
            <a
              className="font-semibold text-base text-muted-foreground transition-color hover:text-foreground"
              href="https://showcase-2-0.onrender.com/oauth2/authorization/github"
            >
              Войти
            </a>
          </li>
          <li>
            <ThemeToggle className="shadow-sm" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
