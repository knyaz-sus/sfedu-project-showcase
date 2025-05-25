import { Button } from "@/shared/ui/button";

export function ErrorFallback({ refetch }: { refetch: () => void }) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center absolute top-0 left-0 h-svh w-full bg-background">
      <div className="flex gap-2 items-center">
        <h1 className="text-foreground">Проект не найден</h1>
      </div>
      <Button onClick={() => refetch()} size="sm">
        Попробывать снова
      </Button>
    </div>
  );
}
