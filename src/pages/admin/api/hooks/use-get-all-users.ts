import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../get-all-users";

export function useGetAllUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
}
