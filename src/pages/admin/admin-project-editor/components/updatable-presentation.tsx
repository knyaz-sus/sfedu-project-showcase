import { useState } from "react";
import { getAdminCredentials } from "@/pages/admin/utils/get-admin-credentials";
import { Input } from "@/shared/ui/input";
import { ConfirmButton } from "./confirm-button";
import { useToast } from "@/shared/hooks/use-toast";
import { useUpdateProjectPresentation } from "../api/hooks/use-project-presentation";

interface UpdatablePresentationProps {
  previousValue?: string;
  projectId: string;
}

export function UpdatablePresentation({
  previousValue,
  projectId,
}: UpdatablePresentationProps) {
  const { mutateAsync, isPending } = useUpdateProjectPresentation();
  const { toast } = useToast();
  const [presentation, setPresentation] = useState<string | null>(null);

  const currentPresentation =
    presentation !== null ? presentation : previousValue ?? "";

  const handlePresentationChange = async () => {
    try {
      const { login, password } = getAdminCredentials();
      await mutateAsync({
        projectId,
        presentation: currentPresentation,
        login,
        password,
      });
    } catch (error) {
      toast({
        title: "Не удалось изменить ссылку на презентацию",
        description:
          error instanceof Error
            ? error.message
            : "Что-то пошло не так, попробуйте позже",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2 w-full">
      <Input
        placeholder="Введите ссылку на презентацию..."
        className="border-none shadow-none p-1 h-auto"
        value={currentPresentation}
        onChange={(e) => setPresentation(e.target.value)}
      />
      <ConfirmButton
        className="h-auto"
        show={!!currentPresentation && currentPresentation !== previousValue}
        isLoading={isPending}
        onConfirm={handlePresentationChange}
      />
    </div>
  );
}
