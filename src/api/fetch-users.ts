import { fetchWithValidation } from "@/api/fetch-with-validation";
import { usersSchema } from "@/types/schemas";

export async function fetchUsers() {
  return await fetchWithValidation(usersSchema, "/users");
}
