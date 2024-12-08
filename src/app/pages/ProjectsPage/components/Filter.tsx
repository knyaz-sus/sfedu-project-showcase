import { useState } from "react";
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
import { Loading } from "@/components/Loading";

interface FilterProps {
  placeholder: string;
  emptyFilterText: string;
  entities?: { name: string; id: number }[];
  isLoading: boolean;
}

export function Filter({
  placeholder,
  emptyFilterText,
  entities,
  isLoading,
}: FilterProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="flex-auto">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {value
            ? entities?.find((entity) => entity.name === value)?.name
            : "По умолчанию"}
          {/* //--radix-popover-trigger-width	The width of the trigger */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>
              <Loading isLoading={isLoading}>{emptyFilterText}</Loading>
            </CommandEmpty>
            <CommandGroup>
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
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
