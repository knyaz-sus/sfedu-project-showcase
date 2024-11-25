import { Link, useLocation } from "react-router-dom";
import { AppLink } from "@/components/AppLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { headerPages } from "@/constants/buttonVariants";
import { Button } from "@/components/Button";
import { LogIn } from "lucide-react";
import { Separator } from "@/components/Separator";

export function Header() {
  const location = useLocation();
  return (
    <header className="px-5 bg-background fixed top-0 w-full z-10">
      <nav className="flex items-center justify-between flex-auto h-16">
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
                  "font-semibold " +
                  (location.pathname === page.link ? "text-foreground" : "")
                }
                link={page.link}
                title={page.title}
              />
            </li>
          ))}
        </ul>
        <ul className="flex items-center gap-6">
          <li>
            <Button variant="outline" size="icon" className="shadow-sm">
              <LogIn />
            </Button>
          </li>
          <li>
            <ThemeToggle className="shadow-sm" />
          </li>
        </ul>
      </nav>
      <Separator />
    </header>
  );
}
