import { getAllTags } from "../get-all-tags";
import { usePersistentQuery } from "@/shared/hooks/use-persistent-query";

export function useGetAllTags() {
  const { data: tags, isLoading } = usePersistentQuery({
    queryKey: ["tags"],
    queryFn: getAllTags,
  });
  return { tags, isLoading };
}
