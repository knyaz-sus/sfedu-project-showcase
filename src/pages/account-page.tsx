import { Button } from "@/shared/ui/button";
import { API_URL } from "@/shared/api/constants";
import { useAuth } from "@/shared/hooks/use-auth";
import { Link } from "react-router-dom";

export function AccountPage() {
  const { authUser, isAuthLoading } = useAuth();
  if (!authUser && !isAuthLoading) {
    return <div>Пользователь не авторизован</div>;
  }
  if (isAuthLoading) {
    return <div>Загрузка пользователя...</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2 max-w-7xl mx-auto px-4 md:px-0">
      <h1>{authUser?.attributes.name}</h1>
      <Button asChild>
        <Link to="/project-editor">Загрузить проект</Link>
      </Button>
      <Button variant="outline" asChild>
        <a href={`${API_URL}/logout`}>Выйти</a>
      </Button>
    </div>
  );
}
