import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectTrack } from "../update-project-track";

export function useUpdateProjectTrack() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProjectTrack,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
