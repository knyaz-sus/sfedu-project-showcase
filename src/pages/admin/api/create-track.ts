import { API_URL } from "@/shared/api/constants";

export async function createTrack(req: {
  login: string;
  password: string;
  name: string;
}) {
  const res = await fetch(`${API_URL}/admin/tracks`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${req.login}:${req.password}`),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: req.name }),
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Не удалось создать трек");
  }
  return await res.json();
}
