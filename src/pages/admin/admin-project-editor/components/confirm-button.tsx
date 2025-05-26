import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { Check } from "lucide-react";

interface ConfirmButtonProps {
  onConfirm: () => void;
  isLoading: boolean;
  show?: boolean;
  disabled?: boolean;
  className?: string;
}

export function ConfirmButton({
  onConfirm,
  isLoading,
  show = true,
  disabled = false,
  className,
}: ConfirmButtonProps) {
  return (
    show && (
      <Button
        onClick={onConfirm}
        size="icon"
        disabled={disabled}
        className={className}
      >
        {isLoading ? (
          <Spinner className="text-primary-foreground" />
        ) : (
          <Check />
        )}
      </Button>
    )
  );
}
