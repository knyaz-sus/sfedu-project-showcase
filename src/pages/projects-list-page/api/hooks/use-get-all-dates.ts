import { usePersistentQuery } from "@/shared/hooks/use-persistent-query";
import { getAllDates } from "@/pages/projects-list-page/api/get-all-dates";

export function useGetAllDates() {
  return usePersistentQuery({
    queryKey: ["dates"],
    queryFn: getAllDates,
  });
}
