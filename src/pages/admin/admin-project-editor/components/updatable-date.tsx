import { useState } from "react";
import { getAdminCredentials } from "@/pages/admin/utils/get-admin-credentials";
import { ConfirmButton } from "./confirm-button";
import { useToast } from "@/shared/hooks/use-toast";
import { useUpdateProjectDate } from "../api/hooks/use-update-project-date";
import { DateSelect } from "@/shared/widgets/date-select";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { useGetAllDates } from "@/pages/projects-list-page/api/hooks/use-get-all-dates";

interface UpdatableDateProps {
  previousValue: string | null;
  projectId: string;
}

export function UpdatableDate({
  previousValue,
  projectId,
}: UpdatableDateProps) {
  const { mutateAsync, isPending } = useUpdateProjectDate();
  const { toast } = useToast();
  const { data: dates } = useGetAllDates();
  const [edit, setEdit] = useState(false);

  const [date, setDate] = useState<string | null>(null);

  const currentDate = date !== null ? date : previousValue ?? "";

  const handleDateChange = async () => {
    try {
      const { login, password } = getAdminCredentials();
      const dateId = dates?.find((date) => date.name === currentDate)?.id;
      if (!dateId) throw new Error("Не удалось получить дату");
      await mutateAsync({
        projectId,
        dateId: Number(dateId),
        login,
        password,
      });
      setEdit(false);
    } catch (error) {
      toast({
        title: "Не удалось изменить дату",
        description:
          error instanceof Error
            ? error.message
            : "Что-то пошло не так, попробуйте позже",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {!!previousValue && (
        <>
          {!edit && (
            <Badge className="cursor-pointer" onClick={() => setEdit(true)}>
              {previousValue}
            </Badge>
          )}
          {edit && (
            <>
              <DateSelect value={currentDate} onValueChange={setDate} />
              <div className="flex gap-2 items-center w-full">
                <ConfirmButton
                  isLoading={isPending}
                  onConfirm={handleDateChange}
                  disabled={!currentDate || currentDate === previousValue}
                />
                <Button onClick={() => setEdit(false)} variant="outline">
                  Отменить
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
