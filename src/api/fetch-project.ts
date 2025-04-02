import { fetchWithValidation } from "@/api/fetch-with-validation";
import { projectSchema } from "@/types/schemas";

export async function fetchProject(id: number) {
  return await fetchWithValidation(projectSchema, `/projects/${id}`);
}
