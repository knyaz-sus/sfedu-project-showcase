import { fetchFavorite } from "@/api/fetchFavorite";
import { useQuery } from "@tanstack/react-query";
import { Projects } from "@/types/database";
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
      {/* <div className="p-3 flex flex-col gap-3">
        <h1 className="text-center">О проектной деятельности</h1>
        <div>
          Проектная деятельность (ПД) — это дисциплина, направленная на
          получение практического опыта по специальности. Соответственно, для
          каждой специальности предлагаются уникальные проекты. Это могут быть
          как задачи, предложенные университетом, так и внешние: от людей и
          компаний, сотрудничающих с Политехом. Задача этого предмета — дать
          возможность студентам решить какую-либо проблему, с которой они могут
          столкнуться после окончания университета. Чаще всего это разработка
          какого-либо сайта, портала, мобильного приложения и т.п.
        </div>
      </div> */}
    </div>
  );
}
