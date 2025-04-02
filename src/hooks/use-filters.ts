import { FiltersContext } from "@/context/filter-context";
import { useContextTyped } from "@/hooks/use-context-typed";

export const useFilters = () => useContextTyped(FiltersContext);
