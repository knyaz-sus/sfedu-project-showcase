import { PropsWithChildren, useEffect, useState } from "react";
import { Filters, FiltersContext } from "./filters-context";

const initialState: Filters = {
  tags: [],
  track: "",
  date: "",
};

export function FiltersProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState(initialState);
  const resetFilters = () => setFilters(initialState);
  const isEmpty =
    filters.tags.length === 0 ||
    Boolean(!filters.track) ||
    Boolean(!filters.date);

  const setStorageState = (state: Filters) => {
    setFilters(state);
    localStorage.setItem("filters", JSON.stringify(state));
  };
  useEffect(() => {
    const storageState = localStorage.getItem("filters");
    if (storageState) {
      setFilters(storageState ? JSON.parse(storageState) : initialState);
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
