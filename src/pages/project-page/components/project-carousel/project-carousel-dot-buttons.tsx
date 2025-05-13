import { ComponentPropsWithRef } from "react";

type DotButtonProps = ComponentPropsWithRef<"button">;

export function DotButton(props: DotButtonProps) {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
}
