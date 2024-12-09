import { API_URL } from "@/constants/url";

export async function fetchCurrentUser() {
  try {
    const res = await fetch(`${API_URL}/api/user`, {
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
