import { useId } from "react";
import { ProjectCards } from "@/pages/projects-list-page/components/project-cards";
import { Input } from "@/shared/ui/input";
import { TagsSelect } from "@/shared/widgets/tags-select";
import { Badge } from "@/shared/ui/badge";
import { useFilters } from "./hooks/use-filters";
import { ResetIcon } from "@radix-ui/react-icons";
import { Button } from "@/shared/ui/button";
import { useGetFilteredProjects } from "./api/hooks/use-get-filtered-projects";
import { TrackSelect } from "@/shared/widgets/track-select";
import { DateSelect } from "@/shared/widgets/date-select";
import { useDebouncedInput } from "@/shared/hooks/use-debounce";

export function ProjectsListPage() {
  const [value, debouncedValue, setValue] = useDebouncedInput("");
  const { filters, setFilters, resetFilters, isEmpty } = useFilters();
  const { data: projects } = useGetFilteredProjects(filters, debouncedValue);
  const updateDateFilter = (date: string) => {
    setFilters({ ...filters, date });
  };
  const updateTrackFilter = (track: string) => {
    setFilters({ ...filters, track });
  };
  const updateTagsFilter = (tag: string) => {
    if (filters.tags.includes(tag)) {
      setFilters({
        ...filters,
        tags: filters.tags.filter((t) => t !== tag),
      });
    } else {
      setFilters({
        ...filters,
        tags: [...filters.tags, tag],
      });
    }
  };
  const id = useId();
  return (
    <div className="flex flex-col gap-2 max-w-7xl items-center px-4 md:px-0 w-full">
      <div className="flex flex-col lg:justify-between lg:flex-row gap-2 mb-5 w-full">
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name={`${id}-search`}
          id={`${id}-search`}
          placeholder="Введите имя проекта..."
        />
        <div className="flex gap-2">
          <TrackSelect
            value={filters.track}
            onValueChange={updateTrackFilter}
          />
          <DateSelect value={filters.date} onValueChange={updateDateFilter} />
          <TagsSelect value={filters.tags} onValueChange={updateTagsFilter} />
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
      {!!projects && (
        <div className="w-full">
          <Badge className="mb-2" variant="secondary">
            Показано проектов: {projects.length}
          </Badge>
        </div>
      )}

      <ProjectCards projects={projects} />
    </div>
  );
}
