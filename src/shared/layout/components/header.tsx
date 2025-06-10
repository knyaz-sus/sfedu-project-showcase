import { Link, NavLink } from "react-router";
import { cn } from "@/shared/lib/cn";
import { Separator } from "@/shared/ui/separator";
import { UserAccountButton } from "./user-account-button";

export function Header() {
  return (
    <header className="bg-background shadow-sm fixed top-0 w-full z-10">
      <nav className="flex items-center justify-between flex-auto h-14 px-5">
        <ul className="flex items-center  sm:gap-2">
          <li className="mr-3">
            <Link to="/" className="flex items-center">
              <img className="max-w-9 max-h-9" src="/img/logo.png" alt="logo" />
            </Link>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                cn(
                  "font-medium text-xs sm:text-sm text-foreground/75 p-1 transition-colors hover:text-foreground",
                  {
                    "text-foreground": isActive,
                  }
                )
              }
              to="/"
            >
              Витрина
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                cn(
                  "font-medium text-xs sm:text-sm text-foreground/75 p-1 transition-colors hover:text-foreground",
                  {
                    "text-foreground": isActive,
                  }
                )
              }
              to="/projects"
            >
              Проекты
            </NavLink>
          </li>
        </ul>
        <UserAccountButton />
      </nav>
      <Separator />
    </header>
  );
}
