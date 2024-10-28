import { fetchFavorite } from "../../../api/fetchFavorite";
import { fetchLastYear } from "../../../api/fetchLastYear";
import { useQuery } from "@tanstack/react-query";
import { Projects } from "../../../types/database";
import { AboutSection } from "./AboutSection";
import { Cards } from "../../../components/Card/Cards";

export function MainPage() {
  const { data: favorite, isLoading: isFavLoading } = useQuery<Projects>({
    queryKey: ["favorite"],
    queryFn: fetchFavorite,
    refetchOnWindowFocus: false,
  });
  const { data: lastYear, isLoading: isLastYearLoading } = useQuery<Projects>({
    queryKey: ["lastYear"],
    queryFn: fetchLastYear,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-center m-2">Избранные проекты</h1>
      {isFavLoading ? <div>Loading ...</div> : <Cards projects={favorite} />}
      <AboutSection />
      <h1 className="text-center m-2">Лучшие проекты за прошлый год</h1>
      {isLastYearLoading ? (
        <div>Loading ...</div>
      ) : (
        <Cards projects={lastYear} />
      )}
    </div>
  );
}
