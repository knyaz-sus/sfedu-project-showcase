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
import { useGetAllDates } from "@/pages/projects-list-page/api/hooks/use-get-all-dates";
import { Spinner } from "@/shared/ui/spinner";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

export function DateFilter() {
  const { data: dates, isPending, isError } = useGetAllDates();
  const { filters, setFilters } = useFilters();
  const [open, onOpenChange] = useState(false);

  const handleValueChange = (value: string) => {
    setFilters({ ...filters, date: value });
  };
  const resetDate = () => {
    handleValueChange("");
    onOpenChange(false);
  };
  return (
    <Select
      open={open}
      onOpenChange={onOpenChange}
      value={filters.date}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-[250px]">
        {isPending ? "Loading..." : <SelectValue placeholder="Выберите год" />}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="flex justify-between">
          <SelectLabel>Год</SelectLabel>
          <Button
            onClick={resetDate}
            disabled={!filters.date}
            size="sm"
            variant="ghost"
            aria-label="Сбросить выбор трека"
          >
            Сбросить
          </Button>
        </SelectGroup>
        <SelectSeparator />
        {isError && (
          <div className="flex items-center justify-center py-2 w-full">
            <span className="text-sm">Ошибка загрузки данных</span>
          </div>
        )}
        {isPending ? (
          <div className="flex items-center justify-center py-2 w-full">
            <Spinner />
          </div>
        ) : (
          <SelectGroup>
            {dates?.map((date) => (
              <SelectItem key={date.id} value={date.name}>
                {date.name}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}
