import { ChangeEvent, useId, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/api/fetchProjects";
import { ProjectCards } from "@/components/Card/ProjectCards";
import { Input } from "@/components/Input";
import { TagsFilter } from "./components/TagsFilter";
import { TracksFilter } from "./components/TracksFilter";
import { SearchParams } from "./components/SearchParams";
import { Badge } from "@/components/Badge";
import { useFilters } from "@/hooks/useFilters";
import { ResetIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/Button";
import { ProjectSkeleton } from "@/components/ProjectSkeleton";

export function ProjectsPage() {
  const [searchValue, setSearchValue] = useState("");
  const { filters, resetFilters } = useFilters();
  const id = useId();
  const { data: projects, isPending } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    refetchOnWindowFocus: false,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <>
      <div
        className="flex flex-col justify-start gap-2 items-stretch
                      md:flex-row md:justify-between"
      >
        <Input
          type="text"
          value={searchValue}
          onChange={handleChange}
          name={`${id}-search`}
          id={`${id}-search`}
          placeholder="Введите имя проекта..."
        />
        <div className="flex justify-stretch gap-3">
          <TagsFilter />
          <TracksFilter />
          <Button
            disabled={
              filters.tagFilter.length === 0 && filters.trackFilter.length === 0
            }
            size="icon"
            variant="outline"
            onClick={resetFilters}
          >
            <ResetIcon />
          </Button>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-2 items-end py-5">
          {!!projects && (
            <>
              <Badge variant="secondary">
                Показано проектов: {projects.length}
              </Badge>
              <SearchParams />
            </>
          )}
        </div>
        <div
          className="grid grid-cols-1 gap-6
                 md:grid-cols-3 lg:grid-cols-4"
        >
          {isPending ? (
            Array(6)
              .fill(0)
              .map(() => <ProjectSkeleton />)
          ) : (
            <ProjectCards projects={projects} />
          )}
        </div>
      </div>
    </>
  );
}
