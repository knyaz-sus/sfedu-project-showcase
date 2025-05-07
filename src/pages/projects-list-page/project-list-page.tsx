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
    <div className="flex flex-col gap-2 max-w-7xl mx-auto px-4 md:px-0">
      <div className="flex flex-col lg:justify-between lg:flex-row gap-2 mb-5 ">
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name={`${id}-search`}
          id={`${id}-search`}
          placeholder="Введите имя проекта..."
        />
        <div className="flex gap-2">
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
        <ProjectCards projects={projects} />
      </div>
    </div>
  );
}
