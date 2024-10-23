import { ReactNode } from "react";

export function Main(props: { children: ReactNode }) {
  return <main className="main d-flex flex-column">{props.children}</main>;
}
