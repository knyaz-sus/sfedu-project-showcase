import { API_URL } from "@/shared/api/constants";
import { CreateProject, createProjectSchema } from "@/shared/types/schemas";

function createFormData(project: CreateProject) {
  const validatedProject = createProjectSchema.safeParse(project);

  if (validatedProject.error) {
    throw Error("Не все необходимые поля корректно заполнены");
  }

  const formData = new FormData();
  formData.append("title", project.title);
  formData.append("description", project.description ?? "");
  formData.append("repo", project.repo);
  formData.append("presentation", project.presentation ?? "");

  formData.append("trackId", String(project.trackId));
  formData.append("dateId", String(project.dateId));

  project.usersId.forEach(() =>
    formData.append("usersId", String(project.usersId[0]))
  );

  project.tagsId.forEach((id) => formData.append("tagsId", String(id)));

  if (project.mainScreenshot) {
    formData.append("mainScreenshot", project.mainScreenshot);
  }
  if (project.screenshots) {
    project.screenshots.forEach((file) => formData.append("screenshots", file));
  }

  return formData;
}

export async function createProject(project: CreateProject) {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    body: createFormData(project),
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Что-то пошло не так");
  }
}
