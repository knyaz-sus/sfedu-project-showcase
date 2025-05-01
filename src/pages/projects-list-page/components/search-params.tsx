import { Badge } from "@/shared/ui/badge";
import { useFilters } from "@/pages/projects-list-page/hooks/use-filters";

export function SearchParams() {
  const { filters } = useFilters();
  return (
    <>
      {filters.tags.map((value) => (
        <Badge className="cursor-pointer" key={value}>
          {value}
        </Badge>
      ))}
    </>
  );
}
