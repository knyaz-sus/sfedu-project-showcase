import { API_URL } from "@/shared/api/constants";
import { Credentials } from "@/shared/types/schemas";

export async function deleteProjectTag({
  projectId,
  tagId,
  login,
  password,
}: {
  projectId: string;
  tagId: number;
} & Credentials) {
  const res = await fetch(
    `${API_URL}/admin/projects/${projectId}/tags/remove?tagId=${encodeURIComponent(
      tagId
    )}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa(`${login}:${password}`),
      },
    }
  );

  if (!res.ok) throw new Error("Не удалось удалить тег с проекта");
}
