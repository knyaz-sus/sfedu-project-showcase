import { API_URL } from "@/shared/api/constants";
import { Credentials } from "@/shared/types/schemas";

export async function updateProjectRepo({
  projectId,
  repo,
  login,
  password,
}: {
  projectId: string;
  repo: string;
} & Credentials) {
  const res = await fetch(
    `${API_URL}/admin/projects/${projectId}/repo?repo=${encodeURIComponent(
      repo
    )}`,
    {
      method: "PATCH",
      headers: {
        Authorization: "Basic " + btoa(`${login}:${password}`),
      },
    }
  );

  if (!res.ok) {
    throw new Error("Произошла ошибка при изменении ссылки на репозиторий");
  }
}
