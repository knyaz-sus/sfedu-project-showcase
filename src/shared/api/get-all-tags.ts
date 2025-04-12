import { fetchWithValidation } from "@/shared/api/fetch-with-validation";
import { tagsSchema } from "@/shared/types/schemas";

export async function getAllTags() {
  return await fetchWithValidation(tagsSchema, "/tags");
}
