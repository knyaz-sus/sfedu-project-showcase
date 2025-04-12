import { getAllProjects } from "../get-all-projects";
import { usePersistentQuery } from "@/shared/hooks/use-persistent-query";

export function useGetAllProjects() {
  const { data: projects, isPending } = usePersistentQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });
  return { projects, isPending };
}
