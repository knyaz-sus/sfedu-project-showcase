import { API_URL } from "@/shared/api/constants";

export async function getAdmin(login: string, password: string) {
  const res = await fetch(`${API_URL}/api/principal`, {
    headers: {
      Authorization: "Basic " + btoa(`${login}:${password}`),
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`);
  }

  return await res.json();
}
