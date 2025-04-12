import { projectsSchema } from "@/shared/types/schemas";
import { fetchWithValidation } from "@/shared/api/fetch-with-validation";

export async function getFavoriteProjects() {
  const projects = await fetchWithValidation(projectsSchema, `/projects`);
  return projects?.filter((project, i) => {
    if (i < 3) return project;
  });
}
