import { API_URL } from "@/shared/api/constants";

export async function createTag(req: {
  login: string;
  password: string;
  name: string;
}) {
  const res = await fetch(`${API_URL}/admin/tags`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${req.login}:${req.password}`),
      "Content-Type": "application/json",
    },
    body:  JSON.stringify({ name: req.name }),
  });
  if (!res.ok) {
    throw new Error("Не удалось создать тег");
  }
  return await res.json();
}
