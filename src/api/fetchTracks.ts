import { fetchWithValidation } from "./fetchWithValidation";
import { tagsSchema } from "@/types/schemas";

export async function fetchTracks() {
  return await fetchWithValidation(tagsSchema, "/tracks");
}
