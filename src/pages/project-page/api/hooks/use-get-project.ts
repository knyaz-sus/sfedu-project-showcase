import { getProject } from "@/pages/project-page/api/get-project";
import { usePersistentQuery } from "@/shared/hooks/use-persistent-query";

export function useGetProject(id: string) {
  return usePersistentQuery({
    queryKey: ["projects", id],
    queryFn: () => getProject(id),
  });
}
