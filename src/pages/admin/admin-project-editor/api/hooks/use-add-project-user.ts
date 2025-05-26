import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProjectUser } from "../add-project-user";

export function useAddProjectUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProjectUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
