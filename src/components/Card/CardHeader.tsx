import { ReactNode } from "react";

export function CardHeader({ children }: { children: string | ReactNode }) {
  return <span className="flex-auto p-3">{children}</span>;
}
