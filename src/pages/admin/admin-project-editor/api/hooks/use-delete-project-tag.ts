import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectTag } from "../delete-project.tag";

export function useDeleteProjectTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProjectTag,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
