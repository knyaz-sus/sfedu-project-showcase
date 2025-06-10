import { Link, useLocation } from "react-router";
import { Button } from "@/shared/ui/button";

export function ErrorPage() {
  const location = useLocation();
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-svh">
      <h1>Путь {location.pathname} не найден</h1>
      <Button asChild>
        <Link to="/">На домашнюю страницу</Link>
      </Button>
    </div>
  );
}
