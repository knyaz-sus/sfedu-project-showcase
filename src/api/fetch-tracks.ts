import { fetchWithValidation } from "@/api/fetch-with-validation";
import { tagsSchema } from "@/types/schemas";

export async function fetchTracks() {
  return await fetchWithValidation(tagsSchema, "/tracks");
}
