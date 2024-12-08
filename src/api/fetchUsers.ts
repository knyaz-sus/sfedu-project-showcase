import { API_URL } from "@/constants/url";

export async function fetchUsers(credentials = "include") {
  try {
    const res = await fetch(`${API_URL}/users`, {
      credentials: credentials,
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
