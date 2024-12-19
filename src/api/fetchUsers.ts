import { fetchWithValidation } from "./fetchWithValidation";
import { usersSchema } from "@/types/schemas";

export async function fetchUsers() {
  return await fetchWithValidation(usersSchema, "/users");
}
