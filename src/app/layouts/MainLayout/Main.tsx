import { ReactNode } from "react";

export function Main(props: { children: ReactNode }) {
  return (
    <main className="w-full min-h-svh max-w-5xl">{props.children}</main>
  );
}
