import { ReactNode } from "react";

interface ButtonProps {
  handleClick?: () => void | Promise<unknown>;
  children: ReactNode | string;
  type?: "button" | "submit" | "reset";
}

export function Button({ handleClick, children, type }: ButtonProps) {
  return (
    <button
      className="text-header bg-highlight rounded-md pt-1 pl-2 pb-1 pr-2"
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
}
