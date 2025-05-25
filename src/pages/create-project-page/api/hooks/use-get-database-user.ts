import { usePersistentQuery } from "@/shared/hooks/use-persistent-query";
import { getDatabaseUser } from "../get-database-user";

export function useGetDatabaseUser(email: string, enabled: boolean) {
  return usePersistentQuery({
    queryKey: ["database-user"],
    queryFn: () => getDatabaseUser(email),
    enabled,
  });
}
