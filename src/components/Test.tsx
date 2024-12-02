import { fetchUsers } from "@/api/fetchUsers";
import { User } from "@/types/database";
import { useQuery } from "@tanstack/react-query";

export function Test() {
  const { data: users } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  return (
    <>
      {users?.map((user) => {
        <div>`${user.id}`</div>;
      })}
    </>
  );
}
