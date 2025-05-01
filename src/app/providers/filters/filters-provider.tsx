import { PropsWithChildren, useEffect, useState } from "react";
import { Filters, FiltersContext, filtersSchema } from "./filters-context";

const initialState: Filters = {
  tags: [],
  track: "",
  date: "",
};

export function FiltersProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState(initialState);
  const isEmpty = filters.tags.length === 0 && !filters.track && !filters.date;

  const setStorageState = (state: Filters) => {
    setFilters(state);
    localStorage.setItem("filters", JSON.stringify(state));
  };
  const resetFilters = () => {
    setStorageState(initialState);
  };
  useEffect(() => {
    const storageState = localStorage.getItem("filters");
    if (storageState) {
      const parsedState = JSON.parse(storageState);

      const { data, error } = filtersSchema.safeParse(parsedState);
      if (error) throw error;

      setFilters(storageState ? data : initialState);
    }
  }, []);
  return (
    <FiltersContext
      value={{
        isEmpty,
        filters,
        setFilters: setStorageState,
        resetFilters,
      }}
    >
      {children}
    </FiltersContext>
  );
}
