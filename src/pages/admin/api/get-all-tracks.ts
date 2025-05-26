import { fetchWithValidation } from "@/shared/api/fetch-with-validation";
import { tracksSchema } from "@/shared/types/schemas";

export async function getAllTracks() {
  try {
    return await fetchWithValidation(tracksSchema, "/tracks");
  } catch (e) {
    console.log(e);
    throw new Error("Не удалось загрузить треки");
  }
}
