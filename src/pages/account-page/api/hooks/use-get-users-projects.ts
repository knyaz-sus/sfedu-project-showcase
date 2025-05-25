import { usePersistentQuery } from "@/shared/hooks/use-persistent-query";
import { getUserProjects } from "../get-users-projects";
import { mapProjects } from "@/shared/utils/map-projects";

export function useGetUsersProjects(id?: string) {
  return usePersistentQuery({
    queryKey: ["users-projects"],
    queryFn: () => getUserProjects(id),
    select(data) {
      if (data) return mapProjects(data);
    },
  });
}
