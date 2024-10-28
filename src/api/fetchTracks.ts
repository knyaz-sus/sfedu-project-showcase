import data from "./data.json";

export async function fetchTracks() {
  try {
    const res = await fetch(`${import.meta.env.API_URL}/tracks`);
    return await res.json();
  } catch {
    return data.tracks;
  }
}
