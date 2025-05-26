import { Fragment } from "react";
import { Users } from "@/shared/types/schemas";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Separator } from "@/shared/ui/separator";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/shared/ui/button";

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
  return (
    <ul className="flex flex-col w-full gap-1">
      <div className="flex items-center justify-between">
        <h2 className="text-sm">Участники проекта</h2>
        {isEditable && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (isEditable && onEditClick) {
                onEditClick();
              }
            }}
          >
            <Plus />
          </Button>
        )}
      </div>
      <Separator />
      {users.map((user) => {
        const fallback = user.fullName
          .split(" ")
          .slice(0, 2)
          .map((namePart) => namePart[0])
          .join("");

        const handleClick = async () => {
          if (isEditable && onClick) {
            await onClick(user.id);
          }
        };

        return (
          <Fragment key={user.id}>
            <li
              className={`flex items-center justify-between gap-2 px-2 py-1 rounded-md ${
                isEditable ? "hover:bg-muted cursor-pointer transition" : ""
              }`}
              onClick={handleClick}
            >
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage />
                  <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
                <span>{user.fullName}</span>
              </div>
              {isEditable && (
                <Trash className="w-4 h-4 text-muted-foreground" />
              )}
            </li>
            <Separator />
          </Fragment>
        );
      })}
    </ul>
  );
}
