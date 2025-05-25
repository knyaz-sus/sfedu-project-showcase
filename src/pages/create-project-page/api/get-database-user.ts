import { fetchWithValidation } from "@/shared/api/fetch-with-validation";
import { userSchema } from "@/shared/types/schemas";

export async function getDatabaseUser(email: string) {
  return await fetchWithValidation(userSchema, `/users/email/${email}`);
}
