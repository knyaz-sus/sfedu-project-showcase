import { API_URL } from "@/shared/api/constants";
import { getAdmin } from "./get-admin";

export async function createTag(req: {
  login: string;
  password: string;
  name: string;
}) {
  const admin = await getAdmin(req.login, req.password);
  console.log("admin", admin);
  const res = await fetch(`${API_URL}/admin/tags`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${req.login}:${req.password}`),
    },
    body: req.name,
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Не удалось создать тег");
  }
  return await res.json();
}
