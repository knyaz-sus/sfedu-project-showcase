import { useId } from "react";
import { ProjectCards } from "@/pages/projects-list-page/components/project-cards";
import { Input } from "@/shared/ui/input";
import { TagsFilter } from "./components/tags-filter";
import { Badge } from "@/shared/ui/badge";
import { useFilters } from "./hooks/use-filters";
import { ResetIcon } from "@radix-ui/react-icons";
import { Button } from "@/shared/ui/button";
import { useGetFilteredProjects } from "./api/hooks/use-get-filtered-projects";
import { TrackFilter } from "./components/track-filter";
import { DateFilter } from "./components/date-filter";
import { useDebouncedInput } from "@/shared/hooks/use-debounce";

export function ProjectsListPage() {
  const [value, debouncedValue, setValue] = useDebouncedInput("");
  const { filters, resetFilters, isEmpty } = useFilters();
  const { data: projects } = useGetFilteredProjects(filters, debouncedValue);

  const id = useId();
  return (
    <>
      <div
        className="flex flex-col justify-start gap-2 items-stretch
                   md:flex-row md:justify-between mb-5"
      >
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name={`${id}-search`}
          id={`${id}-search`}
          placeholder="Введите имя проекта..."
        />
        <div className="flex justify-stretch gap-3">
          <TrackFilter />
          <DateFilter />
          <TagsFilter />
          <Button
            disabled={isEmpty}
            size="icon"
            variant="outline"
            onClick={resetFilters}
          >
            <ResetIcon />
          </Button>
        </div>
      </div>
      <div>
        {!!projects && (
          <Badge className="mb-2" variant="secondary">
            Показано проектов: {projects.length}
          </Badge>
        )}
        <div
          className="grid grid-cols-1 gap-6
                 md:grid-cols-3 lg:grid-cols-4"
        >
          <ProjectCards projects={projects} />
        </div>
      </div>
    </>
  );
}
