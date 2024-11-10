import { API_URL } from "@/constants/url";

export async function fetchTracks() {
  try {
    const res = await fetch(`${API_URL}/tracks`);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
