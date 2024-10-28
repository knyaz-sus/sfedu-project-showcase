import data from "./data.json";

export async function fetchProject(id: number | string) {
  try {
    const res = await fetch(`${import.meta.env.API_URL}/projects/${id}`);
    return await res.json();
  } catch {
    return data.projects.find(
      (project) => project.id.toString() === id.toString()
    );
  }
}
