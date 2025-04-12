import { API_URL } from "@/shared/api/constants";

export async function getUser() {
  try {
    const res = await fetch(`${API_URL}/api/user`, {
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
