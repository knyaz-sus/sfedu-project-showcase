import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { Loading } from "./Loading";
import { useState } from "react";

interface FilterProps {
  placeholder: string;
  errorMessage: string;
  entities?: { name: string; id: number }[];
  isLoading: boolean;
}

export function Filter({
  placeholder,
  errorMessage,
  entities,
  isLoading,
}: FilterProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? entities?.find((entity) => entity.name === value)?.name
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Фильтр по тегу..." />
          <CommandList>
            <CommandEmpty>{errorMessage}</CommandEmpty>
            <CommandGroup>
              <Loading isLoading={isLoading}>
                {entities?.map((entity) => (
                  <CommandItem
                    key={entity.id}
                    value={entity.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === entity.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {entity.name}
                  </CommandItem>
                ))}
              </Loading>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
