import { createContext } from "react";

export type Filters = {
  tags: string[];
  track: string;
  date: string;
};

type FiltersProviderState = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  resetFilters: () => void;
  isEmpty: boolean;
};

export const FiltersContext = createContext<FiltersProviderState>({
  filters: {
    tags: [],
    track: "",
    date: "",
  },
  isEmpty: true,
  setFilters: () => {},
  resetFilters: () => {},
});
