import { API_URL } from "@/constants/url";

export async function fetchProject(id: number) {
  try {
    const res = await fetch(`${API_URL}/projects/${id}`);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
