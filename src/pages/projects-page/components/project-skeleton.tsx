import { Skeleton } from "@/shared/ui/skeleton";

export function ProjectSkeleton() {
  return (
    <Skeleton className="rounded-xl border border-border bg-card text-card-foreground shadow">
      <div className="rounded-lg rounded-b-none overflow-hidden"></div>
    </Skeleton>
  );
}
