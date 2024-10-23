import data from "./data.json";
import { fetchProject } from "./fetchProject";

export function fetchLastYear() {
  return fetch(`${import.meta.env.API_URL}/lastYear`)
    .then((res) => {
      return res.json();
    })
    .then((data: number[]) => {
      return Promise.all(
        data.map((projectId: number) => fetchProject(projectId))
      );
    })
    .catch(() => {
      return data.lastYear.map((projectId) =>
        data.projects.find((card) => card.id === projectId)
      );
    });
}
