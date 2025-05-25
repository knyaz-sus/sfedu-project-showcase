import { useGetAllTags } from "@/shared/api/hooks/use-get-all-tags";
import { AdminEntityPanel } from "./components/admin-entity-panel";
import { useMutation } from "@tanstack/react-query";
import { createTag } from "./api/create-tag";

export function AdminTags() {
  const { data: tags, isPending, refetch } = useGetAllTags();
  const { mutateAsync } = useMutation({ mutationFn: createTag });
  return (
    <>
      <h1 className="p-4">Список всех тегов</h1>
      <AdminEntityPanel
        entities={tags}
        isPending={isPending}
        refetch={refetch}
        mutateAsync={mutateAsync}
      />
    </>
  );
}
