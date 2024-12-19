import { fetchWithValidation } from "./fetchWithValidation";
import { tagsSchema } from "@/types/schemas";

export async function fetchTags() {
  return await fetchWithValidation(tagsSchema, "/tags");
}
