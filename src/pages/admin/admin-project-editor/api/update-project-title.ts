import { API_URL } from "@/shared/api/constants";
import { Credentials } from "@/shared/types/schemas";

export async function updateProjectTitle({
  projectId,
  title,
  login,
  password,
}: {
  projectId: string;
  title: string;
} & Credentials) {

  const res = await fetch(
    `${API_URL}/admin/projects/${projectId}/title?title=${encodeURIComponent(
      title
    )}`,
    {
      method: "PATCH",
      headers: {
        Authorization: "Basic " + btoa(`${login}:${password}`),
      },
    }
  );

  if (!res.ok) {
    throw new Error("Произошла ошибка при изменении заголовка");
  }
}
