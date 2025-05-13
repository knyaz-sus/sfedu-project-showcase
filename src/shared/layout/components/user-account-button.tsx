import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/use-auth";
import { API_URL } from "@/shared/api/constants";
import { Spinner } from "@/shared/ui/spinner";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";

export function UserAccountButton() {
  const { isAuthLoading, authUser } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  if (isAuthLoading) {
    return (
      <Button variant="outline" size={isMobile ? "sm" : "default"}>
        <Spinner />
      </Button>
    );
  }
  if (!authUser) {
    return (
      <Button variant="outline" size={isMobile ? "sm" : "default"} asChild>
        <a
          onClick={() => navigate("/login")}
          href={`${API_URL}/oauth2/authorization/azure`}
        >
          Войти
        </a>
      </Button>
    );
  }
  const fallback = authUser.attributes.name
    .split(" ")
    .slice(0, 2)
    .map((namePart) => namePart[0])
    .join("");
  const name = authUser.attributes.name.split(" ").slice(0, 2).join(" ");
  return (
    <Button variant="outline" size={isMobile ? "sm" : "default"} asChild>
      <Link to="/account">
        <Avatar className="w-6 h-6">
          <AvatarImage src={authUser.attributes.picture} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <span>{name}</span>
      </Link>
    </Button>
  );
}
