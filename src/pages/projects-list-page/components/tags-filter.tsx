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
import { useFilters } from "@/pages/projects-list-page/hooks/use-filters";
import { Spinner } from "@/shared/ui/spinner";
import { useGetAllTags } from "@/shared/api/hooks/use-get-all-tags";

export function TagsFilter() {
  const [open, setOpen] = useState(false);
  const { data: tags, isPending } = useGetAllTags();

  const { filters, setFilters } = useFilters();
  const getButtonText = () => {
    if (filters.tags.length === 0) return "Выберите теги";
    if (filters.tags.length === 1) return filters.tags[0];
    return "Выбрано несколько";
  };
  const handleSelect = (currentValue: string) => {
    if (filters.tags.includes(currentValue)) {
      const updatedFilters = {
        ...filters,
        tags: filters.tags.filter((tag) => tag !== currentValue),
      };
      setFilters(updatedFilters);
    } else {
      const updatedFilters = {
        ...filters,
        tags: [...filters.tags, currentValue],
      };
      setFilters(updatedFilters);
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="font-light text-foreground/90"
        >
          {getButtonText()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Фильтр по тегам" />
          <CommandList>
            <CommandEmpty className="flex justify-center items-center text-center">
              {isPending ? (
                <Spinner className="py-4" />
              ) : (
                "Не удалось найти теги"
              )}
            </CommandEmpty>
            <CommandGroup>
              {tags?.map((entity) => (
                <CommandItem
                  key={entity.id}
                  value={entity.name}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4 opacity-0", {
                      "opacity-100": filters.tags.includes(entity.name),
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
