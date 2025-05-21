import { Fragment } from "react";
import { Users } from "@/shared/types/schemas";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Separator } from "@/shared/ui/separator";

export function MemberList({ users }: { users: Users }) {
  return (
    <ul className="flex flex-col w-full gap-1">
      <h2 className="text-sm">Участники проекта</h2>
      <Separator />
      {users.map((user) => (
        <Fragment key={user.id}>
          <li className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage />
              <AvatarFallback>
                {user.fullName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span key={user.id}>{user.fullName}</span>
          </li>
          <Separator />
        </Fragment>
      ))}
    </ul>
  );
}
