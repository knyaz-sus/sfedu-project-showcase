import { FiltersContext } from "@/context/FiltersContext";
import { useContextTyped } from "@/hooks/useContextTyped";

export const useFilters = () => useContextTyped(FiltersContext);
