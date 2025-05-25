import { API_URL } from "@/shared/api/constants";
import { getAdmin } from "./get-admin";

export async function createDate(req: {
  login: string;
  password: string;
  name: string;
}) {
  const admin = await getAdmin(req.login, req.password);
  console.log("admin", admin);
  const res = await fetch(`${API_URL}/admin/dates`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${req.login}:${req.password}`),
    },
    body: JSON.stringify({ name: req.name }),
  });
  if (!res.ok) {
    throw new Error("Не удалось создать дату");
  }
  return await res.json();
}
