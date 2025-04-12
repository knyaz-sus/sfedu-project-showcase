import { useMemo } from "react";
import { Filter } from "./filter";
import { useGetAllTags } from "@/shared/api/hooks/use-get-all-tags";

export function TagsFilter() {
  const { tags, isLoading } = useGetAllTags();
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
