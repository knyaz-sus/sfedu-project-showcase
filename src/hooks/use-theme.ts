import { ThemeContext } from "@/context/theme-context";
import { useContextTyped } from "@/hooks/use-context-typed";

export const useTheme = () => useContextTyped(ThemeContext);
