import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectRepo } from "../update-project-repo";

export function useUpdateProjectRepo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProjectRepo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
