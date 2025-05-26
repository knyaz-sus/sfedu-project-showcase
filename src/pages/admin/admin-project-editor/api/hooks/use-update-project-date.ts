import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectDate } from "../update-project-date";

export function useUpdateProjectDate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProjectDate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
