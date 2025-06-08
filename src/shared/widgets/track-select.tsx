import { EntitySelect } from "./entity-select";
import { useGetAllTracks } from "@/shared/api/hooks/use-get-all-tracks";

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
  const { data: tracks, isError, isPending } = useGetAllTracks();
  return (
    <EntitySelect
      value={value}
      onValueChange={onValueChange}
      entities={tracks}
      isError={isError}
      isPending={isPending}
      placeholder="Выберите трек"
      label="Трек"
      className={className}
      triggerClassName={triggerClassName}
    />
  );
}
