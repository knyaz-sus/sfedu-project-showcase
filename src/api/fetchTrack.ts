import data from "./data.json";

export async function fetchTrack(id: number) {
  try {
    const res = await fetch(`${import.meta.env.API_URL}/tracks/${id}`);
    return await res.json();
  } catch {
    return data.projects.filter((project) => project.track === id);
  }
}
