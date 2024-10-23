import data from "./data.json";
import { fetchProject } from "./fetchProject";

export function fetchFavorite() {
  return fetch(`${import.meta.env.API_URL}/favorite`)
    .then((res) => {
      return res.json();
    })
    .then((data: number[]) => {
      return Promise.all(
        data.map((projectId: number) => fetchProject(projectId))
      );
    })
    .catch(() => {
      return data.star.map((projectId: number) =>
        data.projects.find((card) => card.id === projectId)
      );
    });
}
