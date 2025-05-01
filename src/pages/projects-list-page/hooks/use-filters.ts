import { FiltersContext } from "@/app/providers/filters/filters-context";
import { useContextTyped } from "@/shared/hooks/use-context-typed";

export const useFilters = () => useContextTyped(FiltersContext);
