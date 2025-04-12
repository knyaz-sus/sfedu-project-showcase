import { getFavoriteProjects } from "../get-best-projects";
import { usePersistentQuery } from "@/shared/hooks/use-persistent-query";

export function useGetFavoriteProjects() {
  const { data: favoriteProjects, isPending } = usePersistentQuery({
    queryKey: ["favorite"],
    queryFn: getFavoriteProjects,
  });
  return { favoriteProjects, isPending };
}
