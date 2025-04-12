import { ThemeContext } from "@/app/providers/theme/theme-context";
import { useContextTyped } from "@/shared/hooks/use-context-typed";

export const useTheme = () => useContextTyped(ThemeContext);
