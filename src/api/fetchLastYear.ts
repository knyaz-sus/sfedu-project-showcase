import data from "./data.json";
import { fetchProject } from "./fetchProject";

export async function fetchLastYear() {
  try {
    const res = await fetch(`${import.meta.env.API_URL}/lastYear`);
    const data = await res.json();
    return await Promise.all(
      data.map((projectId: number) => fetchProject(projectId))
    );
  } catch {
    return data.lastYear.map((projectId_1) => data.projects.find((card) => card.id === projectId_1)
    );
  }
}
