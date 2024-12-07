import { API_URL } from "@/constants/url";

export async function login() {
  try {
    const res = await fetch(`${API_URL}/oauth2/authorization/github`);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
