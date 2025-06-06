import { Users } from "@/shared/types/schemas";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Separator } from "@/shared/ui/separator";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";

interface MemberListProps {
  users: Users;
  isEditable: boolean;
  onEditClick?: () => void;
  onClick?: (userId: number) => Promise<void>;
}

export function MemberList({
  users,
  isEditable,
  onClick,
  onEditClick,
}: MemberListProps) {
  const handleUserClick = async (userId: number) => {
    if (isEditable && onClick) await onClick(userId);
  };
  const handleEditClick = () => {
    if (onEditClick) onEditClick();
  };
  const getAvatarFallback = (fullName: string) =>
    fullName
      .split(" ")
      .slice(0, 2)
      .map((namePart) => namePart[0])
      .join("");

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-1 pl-2">
        <h2 className="text-sm">Участники проекта</h2>
        {isEditable && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEditClick}
            aria-label="Добавить участника"
          >
            <Plus />
          </Button>
        )}
      </div>
      <Separator />
      <ul className="flex flex-col w-full">
        {users.map((user) => {
          return (
            <li key={user.id}>
              <button
                className={cn(
                  "flex items-center justify-between gap-2 py-1 my-1 px-2 rounded-md w-full group",
                  { "hover:bg-muted cursor-pointer transition": isEditable }
                )}
                onClick={() => handleUserClick(user.id)}
                disabled={!isEditable}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage />
                    <AvatarFallback>
                      {getAvatarFallback(user.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-left">{user.fullName}</span>
                </div>
                {isEditable && (
                  <Trash className="w-4 h-4 invisible group-hover:visible" />
                )}
              </button>
              <Separator />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
