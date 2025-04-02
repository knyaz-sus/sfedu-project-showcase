import { Badge } from "@/components/badge";
import { useFilters } from "@/hooks/use-filters";

export function SearchParams() {
  const { filters, deleteFilter } = useFilters();
  return (
    <>
      {filters.trackFilter.map((value) => (
        <Badge
          key={value}
          className="cursor-pointer"
          onClick={() => deleteFilter("trackFilter", value)}
        >
          {value}
        </Badge>
      ))}
      {filters.tagFilter.map((value) => (
        <Badge
          className="cursor-pointer"
          onClick={() => deleteFilter("tagFilter", value)}
          key={value}
        >
          {value}
        </Badge>
      ))}
    </>
  );
}
