import { MemberList } from "@/pages/project-page/components/member-list";
import { useToast } from "@/shared/hooks/use-toast";
import { Users } from "@/shared/types/schemas";
import { useAddProjectUser } from "../api/hooks/use-add-project-user";
import { useDeleteProjectUser } from "../api/hooks/use-delete-project-user";
import { getAdminCredentials } from "@/pages/admin/utils/get-admin-credentials";
import { useState } from "react";
import { UsersSelect } from "@/pages/admin/components/users-select";
import { useGetAllUsers } from "@/pages/admin/api/hooks/use-get-all-users";
import { ConfirmButton } from "./confirm-button";
import { Button } from "@/shared/ui/button";

interface UpdateProjectUsers {
  projectId: string;
  projectUsers: Users;
}

export function UpdatableProjectUsers({
  projectId,
  projectUsers,
}: UpdateProjectUsers) {
  const { mutateAsync: mutateAddAsync, isPending } = useAddProjectUser();
  const { mutateAsync: mutateDeleteAsync } = useDeleteProjectUser();
  const [edit, setEdit] = useState(false);
  const [addedUserName, setAddedUserName] = useState("");
  const { toast } = useToast();
  const { data: users } = useGetAllUsers();

  const handleAddUser = async () => {
    try {
      const { login, password } = getAdminCredentials();
      const userId = users?.find((user) => user.fullName === addedUserName)?.id;
      if (!userId) throw new Error("Не удалось получить участника");
      await mutateAddAsync({
        projectId,
        userId,
        login,
        password,
      });
      setAddedUserName("");
      setEdit(false);
    } catch (error) {
      toast({
        title: "Не удалось добавить участник",
        description:
          error instanceof Error
            ? error.message
            : "Что-то пошло не так, попробуйте позже",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const { login, password } = getAdminCredentials();
      await mutateDeleteAsync({
        projectId,
        userId: userId,
        login,
        password,
      });
    } catch (error) {
      toast({
        title: "Не удалось удалить участника",
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
      <MemberList
        onEditClick={() => setEdit(true)}
        users={projectUsers}
        isEditable
        onClick={handleDeleteUser}
      />
      {edit && (
        <div className="flex flex-col gap-2">
          <UsersSelect
            value={addedUserName ? [addedUserName] : []}
            onValueChange={setAddedUserName}
          />
          <div className="flex gap-2 items-center">
            <ConfirmButton
              onConfirm={handleAddUser}
              isLoading={isPending}
              show
              disabled={!addedUserName}
            />
            <Button onClick={() => setEdit(false)} variant="outline">
              Отменить
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
