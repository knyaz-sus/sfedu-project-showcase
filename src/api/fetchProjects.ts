import { API_URL } from "@/constants/url";

export async function fetchProjects() {
  try {
    const res = await fetch(`${API_URL}/projects`);
    return await res.json();
  } catch (e) {
    console.log(e)
  }
}
