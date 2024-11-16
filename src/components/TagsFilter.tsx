import { useMemo } from "react";
import { Filter } from "./Filter";
import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "@/api/fetchTags";
import { Tags } from "@/types/database";

export function TagsFilter() {
  const { data: tags, isLoading } = useQuery<Tags | undefined>({
    queryKey: ["tags"],
    queryFn: fetchTags,
    refetchOnWindowFocus: false,
  });
  const tracksFilter = useMemo(
    () =>
      tags?.map((tag) => {
        const { name, id } = tag;
        return { name, id };
      }),
    [tags]
  );
  return (
    <Filter
      errorMessage="Треки не найдены"
      placeholder="Введите трек"
      entities={tracksFilter}
      isLoading={isLoading}
    />
  );
}
