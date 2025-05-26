import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectGrade } from "../update-project-grade";

export function useUpdateProjectGrade() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProjectGrade,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
