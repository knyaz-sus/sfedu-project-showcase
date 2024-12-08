import { useMemo } from "react";
import { Filter } from "./Filter";
import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "@/api/fetchTags";
import { Tags } from "@/types/database";

export function TagsFilter() {
  const { data: tags, isLoading } = useQuery<Tags>({
    queryKey: ["tags"],
    queryFn: fetchTags,
    refetchOnWindowFocus: false,
  });
  const tagsFilter = useMemo(
    () =>
      tags?.map((tag) => {
        const { name, id } = tag;
        return { name, id };
      }),
    [tags]
  );
  return (
    <Filter
      emptyFilterText="Теги не найдены"
      placeholder="Фильтр по тегу..."
      entities={tagsFilter}
      isLoading={isLoading}
      name="tagFilter"
    />
  );
}
