import { Filters } from "@/types/ui";
import { createContext } from "react";

type FiltersProviderState = {
  filters: Filters;
  updateFilter: (key: keyof Filters, value: string) => void;
};

export const FiltersContext = createContext<FiltersProviderState>({
  filters: {
    tagFilter: null,
    trackFilter: null,
  },
  updateFilter: () => {},
});
