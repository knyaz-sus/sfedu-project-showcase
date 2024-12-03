import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/app/RootLayout/components/ThemeToggle";
import { headerPagesList } from "@/constants/ui";
import { API_URL } from "@/constants/url";
import { cn } from "@/lib/cn";

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
          {headerPagesList.map((page) => (
            <li key={page.link}>
              <Link
                className={cn(
                  "font-semibold text-base text-muted-foreground transition-colors hover:text-foreground",
                  {
                    "text-foreground": location.pathname === page.link,
                  }
                )}
                to={page.link}
              >
                {page.title}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/test">test</Link>
          </li>
        </ul>
        <ul className="flex items-center gap-6">
          <li>
            <a
              className="font-semibold text-base text-muted-foreground transition-color hover:text-foreground"
              href={`${API_URL}/oauth2/authorization/github`}
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
