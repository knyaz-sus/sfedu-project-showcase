import { Badge } from "@/components/Badge";
import { useFilters } from "@/hooks/useFilters";

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
