import { AdminEntityPanel } from "./components/admin-entity-panel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetAllTracks } from "./api/hooks/use-get-all-tracks";
import { createTrack } from "./api/create-track";

export function AdminTracks() {
  const { data: tags, isPending, refetch } = useGetAllTracks();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: createTrack,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
    },
  });
  return (
    <>
      <h1 className="p-4">Список всех треков</h1>
      <AdminEntityPanel
        entities={tags}
        isPending={isPending}
        refetch={refetch}
        mutateAsync={mutateAsync}
      />
    </>
  );
}
