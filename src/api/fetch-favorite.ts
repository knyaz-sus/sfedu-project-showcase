import { projectsSchema } from "@/types/schemas";
import { fetchWithValidation } from "@/api/fetch-with-validation";

export async function fetchFavorite() {
  const projects = await fetchWithValidation(projectsSchema, `/projects`);
  return projects?.filter((project, i) => {
    if (i < 3) return project;
  });
}
