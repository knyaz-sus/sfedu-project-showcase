import { fetchWithValidation } from "@/shared/api/fetch-with-validation";
import { projectsSchema } from "@/shared/types/schemas";

export async function getAllProjects() {
  return await fetchWithValidation(projectsSchema, `/projects`);
}
