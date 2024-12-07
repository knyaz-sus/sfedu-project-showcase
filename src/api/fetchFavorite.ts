// import { API_URL } from "@/constants/url";
import { Projects } from "@/types/database";

export async function fetchFavorite() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
    const data: Projects = await res.json();
    return data.filter((project, i) => {
      if (i < 4) return project;
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
}
