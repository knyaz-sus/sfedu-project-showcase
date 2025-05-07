import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useFilters } from "@/pages/projects-list-page/hooks/use-filters";
import { useState } from "react";
import { Button } from "@/shared/ui/button";

export function TrackFilter() {
  const { filters, setFilters } = useFilters();
  const [open, onOpenChange] = useState(false);

  const handleValueChange = (value: string) => {
    setFilters({ ...filters, track: value });
  };
  const resetDate = () => {
    handleValueChange("");
    onOpenChange(false);
  };
  return (
    <Select
      open={open}
      onOpenChange={onOpenChange}
      value={filters.track}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="flex-auto">
        <SelectValue placeholder="Выберите трек" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="flex justify-between">
          <SelectLabel>Треки</SelectLabel>
          <Button
            onClick={resetDate}
            disabled={!filters.track}
            size="sm"
            variant="ghost"
            aria-label="Сбросить выбор учебного года"
          >
            Сбросить
          </Button>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectItem value="Бакалавриат">Бакалавриат</SelectItem>
          <SelectItem value="Магистратура">Магистратура</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
