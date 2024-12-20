import { fetchUsers } from "@/api/fetchUsers";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/Loading";

export function Test() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  if (!users && !isLoading) return <h1>Похоже что доступ отсутсвует</h1>;
  return (
    <Loading isLoading={isLoading}>
      {users?.map((user) => (
        <div key={user.id}>`${user.id}`</div>
      ))}
    </Loading>
  );
}
