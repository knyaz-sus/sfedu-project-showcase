import { useState } from "react";
import { getAdminCredentials } from "@/pages/admin/utils/get-admin-credentials";
import { Input } from "@/shared/ui/input";
import { ConfirmButton } from "./confirm-button";
import { useToast } from "@/shared/hooks/use-toast";
import { useUpdateProjectRepo } from "../api/hooks/use-project-repo";

interface UpdatableRepoProps {
  previousValue?: string;
  projectId: string;
}

export function UpdatableRepo({
  previousValue,
  projectId,
}: UpdatableRepoProps) {
  const { mutateAsync, isPending } = useUpdateProjectRepo();
  const { toast } = useToast();
  const [repo, setRepo] = useState<string | null>(null);

  const currentRepo = repo !== null ? repo : previousValue ?? "";

  const handleRepoChange = async () => {
    try {
      const { login, password } = getAdminCredentials();
      await mutateAsync({
        projectId,
        repo: currentRepo,
        login,
        password,
      });
    } catch (error) {
      toast({
        title: "Не удалось изменить ссылку на репозиторий",
        description:
          error instanceof Error
            ? error.message
            : "Что-то пошло не так, попробуйте позже",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Введите ссылку на презентацию..."
        className="border-none shadow-none p-1 h-auto"
        value={currentRepo}
        onChange={(e) => setRepo(e.target.value)}
      />
      <ConfirmButton
        className="h-auto"
        show={!!currentRepo && currentRepo !== previousValue}
        isLoading={isPending}
        onConfirm={handleRepoChange}
      />
    </div>
  );
}
