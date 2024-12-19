import { fetchWithValidation } from "./fetchWithValidation";
import { projectSchema } from "@/types/schemas";

export async function fetchProject(id: number) {
  return await fetchWithValidation(projectSchema, `/projects/${id}`);
}
