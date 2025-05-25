import { usePersistentQuery } from "@/shared/hooks/use-persistent-query";
import { getFilteredProjects } from "@/pages/projects-list-page/api/get-filtered-projects";
import { Filters } from "@/app/providers/filters/filters-context";
import { useMemo } from "react";

export function useGetFilteredProjects(
  searchParams: Filters,
  searchValue?: string
) {
  const query = usePersistentQuery({
    queryKey: ["projects", searchParams],
    queryFn: () => getFilteredProjects(searchParams),
  });

  const filteredData = useMemo(() => {
    if (!searchValue || !query.data) return query.data;
    return query.data.filter((project) => {
      const { title, description } = project;
      const search = searchValue.toLowerCase();
      return (
        title.toLowerCase().includes(search) ||
        description?.toLowerCase().includes(search)
      );
    });
  }, [query.data, searchValue]);

  return {
    query,
    data: filteredData,
  };
}
