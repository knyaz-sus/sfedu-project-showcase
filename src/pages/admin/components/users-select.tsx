import { MultipleSearchCommand } from "@/shared/widgets/multiple-search-command";
import { useGetAllUsers } from "@/pages/admin/api/hooks/use-get-all-users";

interface UsersSelectProps {
  value: string[];
  onValueChange: (value: string) => void;
  triggerClassName?: string;
}

export function UsersSelect({
  value,
  onValueChange,
  triggerClassName,
}: UsersSelectProps) {
  const { data: users, isPending, isError } = useGetAllUsers();
  const mappedUsers = users?.map((user) => ({
    id: user.id,
    name: user.fullName,
  }));
  return (
    <MultipleSearchCommand
      value={value}
      onValueChange={onValueChange}
      triggerClassName={triggerClassName}
      isError={isError}
      isPending={isPending}
      entities={mappedUsers}
      placeholder="Выберите пользователей"
      searchPlaceholder="Введите имя пользователя"
    />
  );
}
