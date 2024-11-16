import { Link, useLocation } from "react-router-dom";
import { AppLink } from "@/components/AppLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { headerPages } from "@/constants/buttonVariants";
import { Button } from "@/components/Button";
import { LogIn } from "lucide-react";

export function Header() {
  const location = useLocation();
  return (
    <header className="pl-5 pr-5 pt-2 pb-2 m-0">
      <nav className="flex items-center justify-between flex-auto">
        <ul className="flex items-center gap-6">
          <li className="mr-2">
            <Link to="/">
              <img className="max-w-10 max-h-10" src="/logo.png" alt="logo" />
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
            <Button variant="outline" size="icon">
              <LogIn />
            </Button>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
