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
import { useGetAllTags } from "@/shared/api/hooks/use-get-all-tags";

interface TagsSelectProps {
  value: string[];
  onValueChange: (value: string) => void;
  triggerClassName?: string;
}

export function TagsSelect({
  value,
  onValueChange,
  triggerClassName,
}: TagsSelectProps) {
  const [open, setOpen] = useState(false);
  const { data: tags, isPending } = useGetAllTags();

  const getButtonText = () => {
    if (value.length === 0) return "Выберите теги";
    if (value.length === 1) return value[0];
    return "Выбрано несколько";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("font-light text-foreground/90", triggerClassName)}
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
