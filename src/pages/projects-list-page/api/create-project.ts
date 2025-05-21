import { API_URL } from "@/shared/api/constants";
import { CreateProject, createProjectSchema } from "@/shared/types/schemas";

function createFormData(project: CreateProject) {
  const validatedProject = createProjectSchema.safeParse(project);
  if (!project.mainScreenshot || !project.screenshots) {
    throw Error("Пожалуйста, загрузите изображения");
  }
  if (validatedProject.error) {
    throw Error("Не все необходимые поля корректно заполнены");
  }
  const formData = new FormData();
  formData.append("title", project.title);
  formData.append("description", project.description ?? "");
  formData.append("repo", project.repo);
  formData.append("presentation", project.presentation ?? "");
  formData.append("mainScreenshot", project.mainScreenshot);

  formData.append("trackId", String(project.trackId));
  formData.append("dateId", String(project.dateId));

  project.tagsId.forEach((id) => formData.append("tagsId", String(id)));
  project.usersId.forEach((id) => formData.append("usersId", String(id)));

  project.screenshots.forEach((file) => formData.append("screenshots", file));

  return formData;
}

export async function createProject(project: CreateProject) {
  await fetch(`${API_URL}/projects`, {
    method: "POST",
    body: createFormData(project),
    credentials: "include",
  });
}
