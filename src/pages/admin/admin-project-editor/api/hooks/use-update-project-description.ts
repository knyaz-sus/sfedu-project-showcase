import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectDescription } from "../update-project-description";

export function useUpdateProjectDescription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProjectDescription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
