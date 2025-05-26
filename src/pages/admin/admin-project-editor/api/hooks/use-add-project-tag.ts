import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProjectTag } from "../add-project-tag";

export function useAddProjectTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProjectTag,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
