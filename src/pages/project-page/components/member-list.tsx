import { Fragment } from "react";
import { Users } from "@/shared/types/schemas";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Separator } from "@/shared/ui/separator";

export function MemberList({ users }: { users: Users }) {
  return (
    <ul className="flex flex-col w-full gap-1">
      <h2 className="text-sm">Участники проекта</h2>
      <Separator />
      {users.map((user) => {
        const fallback = user.fullName
          .split(" ")
          .slice(0, 2)
          .map((namePart) => namePart[0])
          .join("");
        return (
          <Fragment key={user.id}>
            <li className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage />
                <AvatarFallback>{fallback}</AvatarFallback>
              </Avatar>
              <span>{user.fullName}</span>
            </li>
            <Separator />
          </Fragment>
        );
      })}
    </ul>
  );
}
