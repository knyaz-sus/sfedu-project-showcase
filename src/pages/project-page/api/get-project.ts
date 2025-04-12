import { fetchWithValidation } from "@/shared/api/fetch-with-validation";
import { projectSchema } from "@/shared/types/schemas";

export async function getProject(id: string) {
  return await fetchWithValidation(projectSchema, `/projects/${id}`);
}
