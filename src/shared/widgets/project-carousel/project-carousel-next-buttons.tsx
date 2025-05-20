import { ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentPropsWithRef } from "react";

type NavButtonProps = ComponentPropsWithRef<"button">;

export function PrevButton(props: NavButtonProps) {
  return (
    <button className="embla__button" type="button" {...props}>
      <ChevronLeft />
    </button>
  );
}

export function NextButton(props: NavButtonProps) {
  return (
    <button className="embla__button" type="button" {...props}>
      <ChevronRight />
    </button>
  );
}
