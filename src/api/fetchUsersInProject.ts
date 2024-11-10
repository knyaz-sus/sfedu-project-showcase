import { API_URL } from "@/constants/url";

export async function fetchUsersInProject(id?: number) {
  try {
    const res = await fetch(`${API_URL}/users`);
    return await res.json();
  } catch (e) {
    console.log(e, id);
  }
}
