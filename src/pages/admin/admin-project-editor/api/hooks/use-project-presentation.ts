import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectPresentation } from "../update-project-presentation";

export function useUpdateProjectPresentation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProjectPresentation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
