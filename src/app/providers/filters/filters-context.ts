import { createContext } from "react";

export type Filters = {
  tagFilter: string[];
  trackFilter: string[];
};

type FiltersProviderState = {
  filters: Filters;
  addFilter: (name: keyof Filters, value: string) => void;
  deleteFilter: (name: keyof Filters, value: string) => void;
  resetFilters: () => void;
};

export type FilterAction =
  | { type: "ADD_FILTER"; name: keyof Filters; value: string }
  | { type: "DELETE_FILTER"; name: keyof Filters; value: string }
  | { type: "RESET_FILTERS" }
  | { type: "SET_NEW_STATE"; newState: Filters };

export const FiltersContext = createContext<FiltersProviderState>({
  filters: {
    tagFilter: [],
    trackFilter: [],
  },
  addFilter: () => {},
  deleteFilter: () => {},
  resetFilters: () => {},
});
