import { API_URL } from "@/constants/url";

export async function fetchTags() {
  try {
    const res = await fetch(`${API_URL}/tags`);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
