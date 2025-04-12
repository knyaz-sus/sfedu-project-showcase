import { fetchWithValidation } from "@/shared/api/fetch-with-validation";
import { tagsSchema } from "@/shared/types/schemas";

export async function getAllTracks() {
  return await fetchWithValidation(tagsSchema, "/tracks");
}
