import { ThemeContext } from "@/context/ThemeContext";
import { useContextTyped } from "@/hooks/useContextTyped";

export const useTheme = () => useContextTyped(ThemeContext);
