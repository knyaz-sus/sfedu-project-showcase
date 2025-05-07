import { fetchWithValidation } from "@/shared/api/fetch-with-validation";
import { datesSchema } from "@/shared/types/schemas";

export async function getAllDates() {
  try {
    return await fetchWithValidation(datesSchema, "/dates");
  } catch (e) {
    console.log(e);
    throw new Error("Не удалось загрузить даты");
  }
}
