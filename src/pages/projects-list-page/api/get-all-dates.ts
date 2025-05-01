import { fetchWithValidation } from "@/shared/api/fetch-with-validation";
import { datesSchema } from "@/shared/types/schemas";

export async function getAllDates() {
  return await fetchWithValidation(datesSchema, "/dates");
}
