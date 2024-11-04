import data from "./data.json";

export async function fetchProject(id: number | string) {
  try {
    const res = await fetch(`https://showcase-g053.onrender.com/projects/${id}`);
    return await res.json();
  } catch {
    return data.projects.find(
      (project) => project.id.toString() === id.toString()
    );
  }
}
