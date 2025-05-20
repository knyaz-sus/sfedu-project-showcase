import { API_URL } from "@/shared/api/constants";
import { CreateProject } from "@/shared/types/schemas";

function createFormData(project: CreateProject) {
  const formData = new FormData();
  formData.append("title", project.title);
  formData.append("description", project.description ?? "");
  formData.append("repo", project.repo);
  formData.append("presentation", project.presentation ?? "");
  formData.append("mainScreenshot", project.mainScreenshot ?? "");

  formData.append("trackId", String(project.trackId));
  formData.append("dateId", String(project.dateId));

  formData.append("tagsId", JSON.stringify(project.tagsId));
  formData.append("usersId", JSON.stringify([1]));
  formData.append("screenshots", JSON.stringify([]));

  return formData;
}

export function createProject(project: CreateProject) {
  return fetch(`${API_URL}/projects`, {
    method: "POST",
    body: createFormData(project),
    credentials: "include",
  });
}
