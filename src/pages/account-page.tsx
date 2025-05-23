import { Button } from "@/shared/ui/button";
import { API_URL } from "@/shared/api/constants";
import { useAuth } from "@/shared/hooks/use-auth";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

export function AccountPage() {
  const { authUser, isAuthLoading } = useAuth();
  if (!authUser && !isAuthLoading) {
    return <div>Пользователь не авторизован</div>;
  }
  const fallback = authUser?.attributes.name
    .split(" ")
    .slice(0, 2)
    .map((namePart) => namePart[0])
    .join("");
  return (
    <div className="flex flex-col justify-between items-center gap-2 max-w-7xl w-full">
      <div className="flex gap-4 items-center">
        <Avatar className="w-16 h-16">
          <AvatarImage src={authUser?.attributes.picture} />
          <AvatarFallback className="font-semibold text-xl">
            {fallback}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1>{authUser?.attributes.name}</h1>
          <span>{authUser?.attributes.email}</span>
        </div>
      </div>
      <div className="flex gap-2 ">
        <Button asChild>
          <Link to="/project-editor">Загрузить проект</Link>
        </Button>
        <Button variant="outline" asChild>
          <a href={`${API_URL}/logout`}>Выйти</a>
        </Button>
      </div>
    </div>
  );
}
