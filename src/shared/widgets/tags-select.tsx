import { useGetAllTags } from "@/shared/api/hooks/use-get-all-tags";
import { MultipleSearchCommand } from "./multiple-search-command";

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
  const { data: tags, isPending, isError } = useGetAllTags();
  return (
    <MultipleSearchCommand
      value={value}
      onValueChange={onValueChange}
      triggerClassName={triggerClassName}
      isError={isError}
      isPending={isPending}
      entities={tags}
      placeholder="Выберите теги"
      searchPlaceholder="Введите название тега"
    />
  );
}
