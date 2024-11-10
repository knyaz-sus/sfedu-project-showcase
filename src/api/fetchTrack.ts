import { API_URL } from "@/constants/url";
import { Projects, Track } from "@/types/database";

export async function fetchTrack(id: number): Promise<Projects | undefined> {
  try {
    const res = await fetch(`${API_URL}/tracks/${id}`);
    const track: Track | undefined = await res.json();

    const resProjects = await fetch(`${API_URL}/projects`);
    const projects: Projects | undefined = await resProjects.json();

    return projects?.filter((project) => {
      if (project.track.id === track?.id) return true;
      else return false;
    });
  } catch (e) {
    console.log(e);
  }
}
