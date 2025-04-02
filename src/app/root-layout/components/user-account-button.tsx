import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Button } from "@/components/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { API_URL } from "@/constants";
import { Spinner } from "@/components/spinner";

export function UserAccountButton() {
  const { isAuthLoading, authUser } = useAuth();
  const navigate = useNavigate();
  if (isAuthLoading) {
    return (
      <Button variant="outline" asChild>
        <Spinner />
      </Button>
    );
  }
  if (!authUser) {
    return (
      <Button variant="outline" asChild>
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
    <Button variant="outline" asChild>
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
