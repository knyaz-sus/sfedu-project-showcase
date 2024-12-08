import { PropsWithChildren, useCallback, useState } from "react";
import { Filters } from "@/types/ui";
import { FiltersContext } from "./FiltersContext";

export function FiltersProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState<Filters>({
    tagFilter: null,
    trackFilter: null,
  });
  const updateFilter = useCallback((key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);
  return (
    <FiltersContext.Provider
      value={{
        filters,
        updateFilter,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
