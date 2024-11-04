import data from "./data.json";

export async function fetchTracks() {
  try {
    const res = await fetch(`https://showcase-g053.onrender.com/tracks`);
    return await res.json();
  } catch {
    return data.tracks;
  }
}
