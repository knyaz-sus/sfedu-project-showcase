import { useToast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/ui/button";
import { ErrorFallback } from "@/shared/ui/error-fallback";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { Input } from "@/shared/ui/input";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { useState } from "react";
import { getAdminCredentials } from "@/pages/admin/utils/get-admin-credentials";

interface AdminEntityPanelProps<T> {
  entities: (T & { name: string }[]) | undefined;
  isPending: boolean;
  refetch: () => void;
  mutateAsync: UseMutateAsyncFunction<
    unknown,
    Error,
    { login: string; password: string; name: string }
  >;
}

export function AdminEntityPanel<T>({
  entities,
  isPending,
  refetch,
  mutateAsync,
}: AdminEntityPanelProps<T>) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  if (isPending) {
    return <FullPageSpinner />;
  }
  if (!entities) {
    return <ErrorFallback refetch={refetch} />;
  }
  const handleMutate = async () => {
    try {
      const { login, password } = getAdminCredentials();
      await mutateAsync({ login, password, name });
      toast({
        title: "Данные успешно загружены",
        variant: "default",
      });
      setName("");
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : "Что-то пошло не так",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <div className="flex flex-col items-center w-full max-h-[70svh] mb-4 overflow-auto">
        {entities.map((entity, index) => (
          <div key={index} className="w-full p-4 border-b last:border-b-0">
            <div>{entity.name}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <Input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="min-w-56"
          placeholder="Введите новые данные"
        />
        <Button disabled={!name} onClick={handleMutate}>
          Загрузить
        </Button>
      </div>
    </>
  );
}
