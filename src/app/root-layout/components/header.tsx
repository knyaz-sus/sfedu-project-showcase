import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/cn";
import { Separator } from "@/components/separator";
import { UserAccountButton } from "./user-account-button";

export function Header() {
  const location = useLocation();
  return (
    <header className="bg-background shadow-sm fixed top-0 w-full z-10">
      <nav className="flex items-center justify-between flex-auto h-14 px-5">
        <ul className="flex items-center gap-2">
          <li className="mr-3">
            <Link to="/" className="flex items-center">
              <img className="max-w-9 max-h-9" src="/logo.png" alt="logo" />
            </Link>
          </li>
          <li>
            <Link
              className={cn(
                "font-medium text-foreground/75 p-1 transition-colors hover:text-foreground",
                {
                  "text-foreground": location.pathname === "/",
                }
              )}
              to="/"
            >
              Витрина
            </Link>
          </li>
          <li>
            <Link
              className={cn(
                "font-medium text-foreground/75 p-1 transition-colors hover:text-foreground",
                {
                  "text-foreground": location.pathname === "/projects",
                }
              )}
              to="/projects"
            >
              Проекты
            </Link>
          </li>
        </ul>
        <UserAccountButton />
      </nav>
      <Separator />
    </header>
  );
}
