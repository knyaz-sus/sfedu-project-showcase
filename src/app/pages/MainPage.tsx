import { fetchFavorite } from "@/api/fetchFavorite";
import { useQuery } from "@tanstack/react-query";
import { Projects, User } from "@/types/database";
import { ProjectCards } from "@/components/Card/ProjectCards";
import { fetchUsers } from "@/api/fetchUsers";
import { Loading } from "@/components/Loading";

export function MainPage() {
  const { data: favorite, isLoading: isFavLoading } = useQuery<
    Projects | undefined
  >({
    queryKey: ["favorite"],
    queryFn: fetchFavorite,
    refetchOnWindowFocus: false,
  });
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn:()=> fetchUsers("same-origin"),
  });
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-center m-2">Избранные проекты</h1>
      <Loading isLoading={isFavLoading}>
        <ProjectCards projects={favorite} />
      </Loading>
      <Loading isLoading={isLoading}>
        {users?.map((user) => (
          <div>`${user.id}`</div>
        ))}
      </Loading>
    </div>
  );
}
