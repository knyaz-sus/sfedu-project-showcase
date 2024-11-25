import { ThemeContext } from "@/context/ThemeContext";
import { useContextTyped } from "./useContextTyped";

export const useTheme = () => useContextTyped(ThemeContext);
