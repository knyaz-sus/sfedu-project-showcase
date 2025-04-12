import { PropsWithChildren, useEffect, useReducer } from "react";
import { FilterAction, Filters, FiltersContext } from "./filters-context";


const filtersReducer = (state: Filters, action: FilterAction): Filters => {
  switch (action.type) {
    case "ADD_FILTER":
      return {
        ...state,
        [action.name]: [...state[action.name], action.value],
      };
    case "DELETE_FILTER":
      return {
        ...state,
        [action.name]: state[action.name].filter(
          (filterValue) => filterValue !== action.value
        ),
      };
    case "RESET_FILTERS":
      return initialState;
    case "SET_NEW_STATE":
      return action.newState;
    default:
      return state;
  }
};

const initialState: Filters = {
  tagFilter: [],
  trackFilter: [],
};

export function FiltersProvider({ children }: PropsWithChildren) {
  const [filters, dispatch] = useReducer(filtersReducer, initialState);
  useEffect(() => {
    const storageState = localStorage.getItem("filters");
    if (!storageState) return;
    dispatch({
      type: "SET_NEW_STATE",
      newState: storageState ? JSON.parse(storageState) : initialState,
    });
  }, []);
  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);
  const addFilter = (name: keyof Filters, value: string) => {
    dispatch({ type: "ADD_FILTER", name, value });
  };
  const deleteFilter = (name: keyof Filters, value: string) => {
    dispatch({ type: "DELETE_FILTER", name, value });
  };
  const resetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };
  return (
    <FiltersContext.Provider
      value={{
        filters,
        addFilter,
        deleteFilter,
        resetFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
