import { ChangeEvent, useId, useState } from "react";
import { ProjectCards } from "@/pages/projects-page/components/project-cards";
import { Input } from "@/shared/ui/input";
import { TagsFilter } from "./components/tags-filter";
import { TracksFilter } from "./components/tracks-filter";
import { SearchParams } from "./components/search-params";
import { Badge } from "@/shared/ui/badge";
import { useFilters } from "./hooks/use-filters";
import { ResetIcon } from "@radix-ui/react-icons";
import { Button } from "@/shared/ui/button";
import { ProjectSkeleton } from "./components/project-skeleton";
import { useGetAllProjects } from "./api/hooks/use-get-all-projects";

export function ProjectsPage() {
  const [searchValue, setSearchValue] = useState("");
  const { filters, resetFilters } = useFilters();
  const id = useId();
  const { projects, isPending } = useGetAllProjects();
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
              .map((_, i) => <ProjectSkeleton key={i} />)
          ) : (
            <ProjectCards projects={projects} />
          )}
        </div>
      </div>
    </>
  );
}
