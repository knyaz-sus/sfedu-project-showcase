import { API_URL } from "@/constants/url";
import { Projects } from "@/types/database";

export async function fetchFavorite() {
  try {
    const res = await fetch(`${API_URL}/projects`);
    if (!res.ok) {
      console.error(`Error fetching data: ${res.status} ${res.statusText}`);
      return;
    }
    const data: Projects = await res.json();
    return data.filter((project, i) => {
      if (i < 4) return project;
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
}
