import { getAllTags } from "@/shared/api/get-all-tags";
import { usePersistentQuery } from "@/shared/hooks/use-persistent-query";

export function useGetAllTags() {
  return usePersistentQuery({
    queryKey: ["tags"],
    queryFn: getAllTags,
    select(data) {
      return data.map((tag) => {
        const { name, id } = tag;
        return { name, id };
      });
    },
  });
}
