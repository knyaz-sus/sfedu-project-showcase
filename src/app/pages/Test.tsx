import { fetchUsers } from "@/api/fetchUsers";
import { User } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../components/Loading";

export function Test() {
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetchUsers,
  });
  if (!users && !isLoading) return <h1>Похоже что доступ отсутсвует</h1>;
  return (
    <Loading isLoading={isLoading}>
      {users?.map((user) => (
        <div>`${user.id}`</div>
      ))}
    </Loading>
  );
}
