import { API_URL } from "@/constants/url";
import { Tags } from "@/types/database";

export async function fetchTags() {
  try {
    const res = await fetch(`${API_URL}/tags`);
    const tags: Tags = await res.json();
    return tags;
  } catch (e) {
    console.log(e);
  }
}
