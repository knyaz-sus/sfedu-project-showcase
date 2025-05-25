import { fetchWithValidation } from "@/shared/api/fetch-with-validation";
import { projectSchema } from "@/shared/types/schemas";

export async function getProject(id: string) {
  const project = await fetchWithValidation(projectSchema, `/projects/${id}`);
  const mappedProject = {
    ...project,
    mainScreenshot: project.mainScreenshot
      ? `http://localhost:8080/api/projects/${project.id}/main_screenshot`
      : null,
    screenshots:
      project.screenshots?.map((_, index) => {
        return `http://localhost:8080/api/projects/${project.id}/screenshots/${index}`;
      }) ?? null,
  };

  return mappedProject;
}
