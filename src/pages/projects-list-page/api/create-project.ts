import { CreateProject } from "@/shared/types/schemas";

export function createProject(project: CreateProject) {
  return fetch("/projects", {
    method: "POST",
    body: JSON.stringify(project),
  });
}
