import { ToggleGroup, ToggleGroupItem } from "@/components/toggle-group";
import { useTheme } from "@/hooks/use-theme";
import { DesktopIcon } from "@radix-ui/react-icons";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem
        value="light"
        className="p-2 h-auto"
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="system"
        className="p-2 h-auto"
        onClick={() => setTheme("system")}
      >
        <DesktopIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="dark"
        className="p-2 h-auto"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
