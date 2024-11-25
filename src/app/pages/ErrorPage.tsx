import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/Button";

export function ErrorPage() {
  const location = useLocation();
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-svh">
      <h1>Путь {location.pathname} не найден</h1>
      <Button>
        <Link to={"/"}>На домашнюю страницу</Link>
      </Button>
    </div>
  );
}
