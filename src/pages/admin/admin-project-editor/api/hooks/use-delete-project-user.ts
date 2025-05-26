import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectUser } from "../delete-project-user";

export function useDeleteProjectUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProjectUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
