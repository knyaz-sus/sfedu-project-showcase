import { useState } from "react";
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
import { useGetAllDates } from "@/pages/projects-list-page/api/hooks/use-get-all-dates";
import { Spinner } from "@/shared/ui/spinner";
import { Button } from "@/shared/ui/button";
import { cn } from "../lib/cn";

interface DateSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  triggerClassName?: string;
}

export function DateSelect({
  value,
  onValueChange,
  className,
  triggerClassName,
}: DateSelectProps) {
  const { data: dates, isPending, isError } = useGetAllDates();
  const [open, onOpenChange] = useState(false);

  const resetDate = () => {
    onValueChange("");
    onOpenChange(false);
  };
  return (
    <Select
      open={open}
      onOpenChange={onOpenChange}
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={cn("flex-auto", triggerClassName)}>
        {isPending ? "Loading..." : <SelectValue placeholder="Выберите год" />}
      </SelectTrigger>
      <SelectContent className={className}>
        <SelectGroup className="flex justify-between">
          <SelectLabel>Год</SelectLabel>
          <Button
            onClick={resetDate}
            disabled={!value}
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
