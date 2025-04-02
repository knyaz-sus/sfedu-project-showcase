import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { useFilters } from "@/hooks/use-filters";
import { Filters } from "@/types/ui";
import { CommandLoading } from "cmdk";

interface FilterProps {
  placeholder: string;
  emptyFilterText: string;
  entities?: { name: string; id: number }[];
  isLoading: boolean;
  name: keyof Filters;
}

export function Filter({
  placeholder,
  emptyFilterText,
  entities,
  isLoading,
  name,
}: FilterProps) {
  const [open, setOpen] = useState(false);
  const { filters, addFilter, deleteFilter } = useFilters();
  const getButtonText = () => {
    if (filters[name].length === 0) return "По умолчанию";
    if (filters[name].length === 1) return filters[name][0];
    return "Выбрано несколько";
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="flex-auto">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {getButtonText()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            {isLoading && <CommandLoading>Loading...</CommandLoading>}
            <CommandEmpty>{emptyFilterText}</CommandEmpty>
            <CommandGroup>
              {entities?.map((entity) => (
                <CommandItem
                  key={entity.id}
                  value={entity.name}
                  onSelect={(currentValue) => {
                    if (filters[name].includes(currentValue)) {
                      deleteFilter(name, currentValue);
                    } else {
                      addFilter(name, currentValue);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      filters[name].includes(entity.name)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
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
