import { ReactNode } from "react";

interface LoadingProps {
  children?: ReactNode;
  isLoading: boolean;
}

export function Loading({ children, isLoading }: LoadingProps) {
  return isLoading ? <div>Loading...</div> : children;
}
