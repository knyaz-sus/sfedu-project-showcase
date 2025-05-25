import { fetchWithValidation } from "@/shared/api/fetch-with-validation";
import { usersSchema } from "@/shared/types/schemas";

export function getAllUsers() {
  return fetchWithValidation(usersSchema, "/users");
}
