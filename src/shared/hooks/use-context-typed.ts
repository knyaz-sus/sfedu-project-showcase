import { Context, useContext } from "react";

export const useContextTyped = <T>(context: Context<T>) => {
  if (!context) throw new Error("Can't access context");
  return useContext<T>(context);
};
