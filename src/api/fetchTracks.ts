import { Tracks } from "@/types/database";

export async function fetchTracks() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tracks`);
    const tracks: Tracks = await res.json();
    return tracks;
  } catch (e) {
    console.log(e);
  }
}
