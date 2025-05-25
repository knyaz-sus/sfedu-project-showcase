import { AdminEntityPanel } from "./components/admin-entity-panel";
import { useMutation } from "@tanstack/react-query";
import { useGetAllTracks } from "./api/hooks/use-get-all-tracks";
import { createTrack } from "./api/create-track";

export function AdminTracks() {
  const { data: tags, isPending, refetch } = useGetAllTracks();
  const { mutateAsync } = useMutation({ mutationFn: createTrack });
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
