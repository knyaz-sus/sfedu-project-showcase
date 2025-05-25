import { AdminEntityPanel } from "./components/admin-entity-panel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetAllDates } from "../projects-list-page/api/hooks/use-get-all-dates";
import { createDate } from "./api/create-date";

export function AdminDates() {
  const { data: tags, isPending, refetch } = useGetAllDates();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: createDate,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["dates"] });
    },
  });
  return (
    <>
      <h1 className="p-4">Список всех дат</h1>
      <AdminEntityPanel
        entities={tags}
        isPending={isPending}
        refetch={refetch}
        mutateAsync={mutateAsync}
      />
    </>
  );
}
