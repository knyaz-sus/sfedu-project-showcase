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
import { Spinner } from "@/shared/ui/spinner";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";

interface Entity {
  id: number;
  name: string;
}

interface EntitySelectProps {
  entities: Entity[] | undefined;
  placeholder: string;
  label: string;
  isPending: boolean;
  isError: boolean;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  triggerClassName?: string;
}

export function EntitySelect({
  entities,
  placeholder,
  label,
  isError,
  isPending,
  value,
  onValueChange,
  className,
  triggerClassName,
}: EntitySelectProps) {
  const [open, onOpenChange] = useState(false);

  const reset = () => {
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
      <SelectTrigger className={cn("flex-auto min-w-56", triggerClassName)}>
        {isPending ? (
          "Loading..."
        ) : (
          <SelectValue placeholder={placeholder ?? "Выберите элемент"} />
        )}
      </SelectTrigger>
      <SelectContent className={cn(className, "min-w-56")}>
        <SelectGroup className="flex justify-between">
          <SelectLabel>{label ?? "Элементы"}</SelectLabel>
          <Button onClick={reset} disabled={!value} size="sm" variant="ghost">
            Сбросить
          </Button>
        </SelectGroup>
        <SelectSeparator />
        {isError && (
          <div className="flex items-center justify-center py-6 w-full">
            <span className="text-sm text-center">Ошибка загрузки данных</span>
          </div>
        )}
        {isPending ? (
          <div className="flex items-center justify-center py-6 w-full">
            <Spinner />
          </div>
        ) : (
          <SelectGroup>
            {entities?.map((entity) => (
              <SelectItem key={entity.id} value={entity.name}>
                {entity.name}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}
