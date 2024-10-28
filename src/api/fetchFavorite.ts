import data from "./data.json";
import { fetchProject } from "./fetchProject";

export async function fetchFavorite() {
  try {
    const res = await fetch(`${import.meta.env.API_URL}/favorite`);
    const data = await res.json();
    return await Promise.all(
      data.map((projectId: number) => fetchProject(projectId))
    );
  } catch {
    return data.star.map((projectId_1: number) =>
      data.projects.find((card) => card.id === projectId_1)
    );
  }
}
