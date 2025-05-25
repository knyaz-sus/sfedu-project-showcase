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
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { cn } from "../lib/cn";

interface TrackSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  triggerClassName?: string;
}

export function TrackSelect({
  value,
  onValueChange,
  className,
  triggerClassName,
}: TrackSelectProps) {
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
        <SelectValue placeholder="Выберите трек" />
      </SelectTrigger>
      <SelectContent className={className}>
        <SelectGroup className="flex justify-between">
          <SelectLabel>Треки</SelectLabel>
          <Button
            onClick={resetDate}
            disabled={!value}
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
