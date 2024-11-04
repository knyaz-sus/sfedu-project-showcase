import { Projects } from "@/types/database";

export async function fetchFavorite(): Promise<Projects | undefined> {
  try {
    const res = await fetch("https://showcase-im57.onrender.com/tracks");
    if (!res.ok) {
      console.error(`Error fetching data: ${res.status} ${res.statusText}`);
      return;
    }
    const data: Projects = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
}
