import { API_URL } from "@/shared/api/constants";
import {
  CreateAdminProject,
  createAdminProjectSchema,
} from "@/shared/types/schemas";

function createFormData(
  project: CreateAdminProject & { login: string; password: string }
) {
  const validatedProject = createAdminProjectSchema.safeParse(project);

  if (validatedProject.error) {
    throw Error("Не все необходимые поля корректно заполнены");
  }

  const formData = new FormData();
  formData.append("title", project.title);
  formData.append("description", project.description ?? "");
  formData.append("repo", project.repo);
  formData.append("presentation", project.presentation ?? "");
  formData.append("grade", String(project.grade));

  formData.append("trackId", String(project.trackId));
  formData.append("dateId", String(project.dateId));

  project.usersId.forEach((id) => formData.append("usersId", String(id)));
  project.tagsId.forEach((id) => formData.append("tagsId", String(id)));

  if (project.mainScreenshot) {
    formData.append("mainScreenshot", project.mainScreenshot);
  }
  if (project.screenshots) {
    project.screenshots.forEach((file) => formData.append("screenshots", file));
  }
  return formData;
}

export async function createAdminProject(
  project: CreateAdminProject & { login: string; password: string }
) {
  const res = await fetch(`${API_URL}/admin/projects`, {
    method: "POST",
    body: createFormData(project),
    headers: {
      Authorization: "Basic " + btoa(`${project.login}:${project.password}`),
    },
  });
  if (!res.ok) {
    throw new Error("Что-то пошло не так");
  }
}
