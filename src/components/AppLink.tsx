import { cn } from "@/lib/cn";
import { Link } from "react-router-dom";

interface AppLinkProps {
  className?: string;
  link: string;
  title: string;
}

export function AppLink({ className, link, title }: AppLinkProps) {
  return (
    <Link
      className={cn(
        "font-semibold text-base text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
      to={link}
    >
      {title}
    </Link>
  );
}
