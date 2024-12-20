import { fetchFavorite } from "@/api/fetchFavorite";
import { useQuery } from "@tanstack/react-query";
import { ProjectCards } from "@/components/Card/ProjectCards";
import { Loading } from "@/components/Loading";

export function MainPage() {
  const { data: favorite, isLoading: isFavLoading } = useQuery({
    queryKey: ["favorite"],
    queryFn: fetchFavorite,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-center m-2">Избранные проекты</h1>
      <Loading isLoading={isFavLoading}>
        <ProjectCards projects={favorite} />
      </Loading>
    </div>
  );
}
