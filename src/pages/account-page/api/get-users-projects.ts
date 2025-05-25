import { fetchWithValidation } from "@/shared/api/fetch-with-validation";
import { projectsSchema } from "@/shared/types/schemas";

export function getUserProjects(userId?: string) {
  if (!userId) return;
  return fetchWithValidation(projectsSchema, `/users/${userId}/projects`);
}
