import { ComponentPropsWithRef } from "react";

type DotButtonProps = ComponentPropsWithRef<"button">;

export function DotButton(props: DotButtonProps) {
  return (
    <button type="button" className="hover:after:bg-border" {...props}></button>
  );
}
