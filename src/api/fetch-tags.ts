import { fetchWithValidation } from "@/api/fetch-with-validation";
import { tagsSchema } from "@/types/schemas";

export async function fetchTags() {
  return await fetchWithValidation(tagsSchema, "/tags");
}
