import { useState } from "react";
import { getAdminCredentials } from "@/pages/admin/utils/get-admin-credentials";
import { Input } from "@/shared/ui/input";
import { ConfirmButton } from "./confirm-button";
import { useToast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/ui/button";
import { useUpdateProjectGrade } from "../api/hooks/use-update-project-grade";

interface UpdatableGradeProps {
  previousValue?: string;
  projectId: string;
}

export function UpdatableGrade({
  previousValue,
  projectId,
}: UpdatableGradeProps) {
  const { mutateAsync, isPending } = useUpdateProjectGrade();
  const { toast } = useToast();
  const [grade, setGrade] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const currentGrade = grade !== null ? grade : previousValue ?? "";

  const handleGradeChange = async () => {
    try {
      const { login, password } = getAdminCredentials();
      const parsedGrade = parseInt(currentGrade);
      if (isNaN(parsedGrade) || parsedGrade < 0 || parsedGrade > 100) {
        throw new Error("Формат оценки не число или вне диапазона от 0 до 100");
      }
      await mutateAsync({
        projectId,
        grade: currentGrade,
        login,
        password,
      });
      setEdit(false);
    } catch (error) {
      toast({
        title: "Не удалось изменить оценку",
        description:
          error instanceof Error
            ? error.message
            : "Что-то пошло не так, попробуйте позже",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <span
        className="hover:text-primary cursor-pointer truncate pl-2 py-1"
        onClick={() => setEdit((prev) => !prev)}
      >
        Оценка проекта: {currentGrade ? currentGrade + "/100" : "не выставлена"}
      </span>
      {edit && (
        <div className="flex gap-2 items-center w-full">
          <Input
            placeholder="Введите ссылку на презентацию..."
            className="border-none shadow-none px-1"
            value={currentGrade}
            onChange={(e) => setGrade(e.target.value)}
            autoFocus
          />
          <ConfirmButton
            isLoading={isPending}
            onConfirm={handleGradeChange}
            disabled={!currentGrade || currentGrade === previousValue}
          />
          <Button
            onClick={() => {
              setEdit(false);
              setGrade(previousValue ?? "");
            }}
            variant="outline"
          >
            Отменить
          </Button>
        </div>
      )}
    </div>
  );
}
