import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectTitle } from "../update-project-title";

export function useUpdateProjectTitle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProjectTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
