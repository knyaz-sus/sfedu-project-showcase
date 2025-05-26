import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { Check } from "lucide-react";

interface ConfirmButtonProps {
  onConfirm: () => void;
  isLoading: boolean;
  show?: boolean;
  disabled?: boolean;
}

export function ConfirmButton({
  onConfirm,
  isLoading,
  show = true,
  disabled = false,
}: ConfirmButtonProps) {
  return (
    show && (
      <Button onClick={onConfirm} size="icon" disabled={disabled}>
        {isLoading ? (
          <Spinner className="text-primary-foreground" />
        ) : (
          <Check />
        )}
      </Button>
    )
  );
}
