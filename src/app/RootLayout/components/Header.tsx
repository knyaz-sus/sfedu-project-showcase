import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/cn";
import { Separator } from "@/components/Separator";
import { Button } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { API_URL } from "@/constants";

export function Header() {
  const location = useLocation();
  const { isAuthLoading, authUser } = useAuth();
  const navigate = useNavigate();
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
        {!isAuthLoading && (
          <ul className="flex items-center gap-6">
            {!authUser && (
              <li>
                <Button variant="outline" asChild>
                  <a
                    onClick={() => navigate("/login")}
                    href={`${API_URL}/oauth2/authorization/github`}
                  >
                    Войти
                  </a>
                </Button>
              </li>
            )}
            {!!authUser && (
              <li>
                <Button className="px-3" variant="outline" asChild>
                  <Link to="/account">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={authUser.attributes.avatar_url} />
                      <AvatarFallback>
                        {authUser.attributes.login.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{authUser.attributes.login}</span>
                  </Link>
                </Button>
              </li>
            )}
          </ul>
        )}
      </nav>
      <Separator />
    </header>
  );
}
