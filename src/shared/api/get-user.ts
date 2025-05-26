import { API_URL } from "@/shared/api/constants";

export async function getUser() {
  const res = await fetch(`${API_URL}/api/user`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return await res.json();
}
