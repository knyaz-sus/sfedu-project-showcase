import { fetchWithValidation } from "@/api/fetch-with-validation";
import { projectsSchema } from "@/types/schemas";

export async function fetchProjects() {
  return await fetchWithValidation(projectsSchema, `/projects`);
}
