import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Spinner } from "@/shared/ui/spinner";

interface Entity {
  id: number;
  name: string;
}

interface MultipleSearchCommandProps {
  entities: Entity[] | undefined;
  value: string[];
  onValueChange: (value: string) => void;
  triggerClassName?: string;
  placeholder: string;
  searchPlaceholder: string;
  isPending: boolean;
  isError: boolean;
}

export function MultipleSearchCommand({
  entities,
  value,
  onValueChange,
  triggerClassName,
  placeholder,
  searchPlaceholder,
  isPending,
  isError,
}: MultipleSearchCommandProps) {
  const [open, setOpen] = useState(false);

  const getButtonText = () => {
    if (value.length === 0) return placeholder;
    if (value.length === 1) return value[0];
    return "Выбрано несколько";
  };

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "font-normal min-w-56 text-left justify-between ",
            triggerClassName,
            { "text-muted-foreground": value.length === 0 }
          )}
        >
          <span className="truncate">{getButtonText()}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty className="flex justify-center items-center text-center py-6 w-full">
              {isPending && <Spinner />}
              {isError && (
                <span className="text-sm text-center">
                  Ошибка загрузки данных
                </span>
              )}
            </CommandEmpty>
            <CommandGroup>
              {entities?.map((entity) => (
                <CommandItem
                  key={entity.id}
                  value={entity.name}
                  onSelect={onValueChange}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4 opacity-0", {
                      "opacity-100": value.includes(entity.name),
                    })}
                  />
                  {entity.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
