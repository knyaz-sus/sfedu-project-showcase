import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdminProject } from "../create-admin-project";

export function useCreateAdminProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdminProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
