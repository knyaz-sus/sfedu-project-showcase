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

  const handleGradeSubmit = async () => {
    try {
      const { login, password } = getAdminCredentials();
      const parsedGrade = Number(currentGrade);
      if (isNaN(parsedGrade)) {
        throw new Error("Неверный формат оценки");
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
  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setGrade(val);
      return;
    }
    if (!/^(0|[1-9]\d{0,2})$/.test(val)) return;
    const num = Number(val);
    if (num >= 0 && num <= 100) {
      setGrade(val);
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
            onChange={handleGradeChange}
            autoFocus
          />
          <ConfirmButton
            isLoading={isPending}
            onConfirm={handleGradeSubmit}
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
