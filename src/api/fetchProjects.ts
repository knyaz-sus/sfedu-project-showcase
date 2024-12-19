import { fetchWithValidation } from "./fetchWithValidation";
import { projectsSchema } from "@/types/schemas";

export async function fetchProjects() {
  return await fetchWithValidation(projectsSchema, `/projects`);
}
