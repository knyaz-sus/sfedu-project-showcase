import { useGetAllDates } from "@/pages/projects-list-page/api/hooks/use-get-all-dates";
import { EntitySelect } from "./entity-select";

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
  const { data: dates, isError, isPending } = useGetAllDates();
  return (
    <EntitySelect
      value={value}
      onValueChange={onValueChange}
      entities={dates}
      isError={isError}
      isPending={isPending}
      placeholder="Выберите год"
      label="Год"
      className={className}
      triggerClassName={triggerClassName}
    />
  );
}
