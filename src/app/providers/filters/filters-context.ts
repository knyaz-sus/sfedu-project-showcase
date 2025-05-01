import { createContext } from "react";
import { z } from "zod";

export type Filters = {
  tags: string[];
  track: string;
  date: string;
};

export const filtersSchema = z.object({
  tags: z.array(z.string()),
  track: z.string(),
  date: z.string(),
});

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
