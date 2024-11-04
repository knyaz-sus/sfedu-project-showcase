import { fetchFavorite } from "@/api/fetchFavorite";
import { useQuery } from "@tanstack/react-query";
import { Projects } from "@/types/database";
import { AboutSection } from "./AboutSection";
import { ProjectCards } from "@/components/Card/ProjectCards";

export function MainPage() {
  const { data: favorite, isLoading: isFavLoading } = useQuery<
    Projects | undefined
  >({
    queryKey: ["favorite"],
    queryFn: fetchFavorite,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-center m-2">Избранные проекты</h1>
      {isFavLoading ? (
        <div>Loading ...</div>
      ) : (
        <ProjectCards projects={favorite} />
      )}
      <AboutSection />
    </div>
  );
}
