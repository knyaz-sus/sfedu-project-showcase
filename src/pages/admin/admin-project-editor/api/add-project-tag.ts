import { API_URL } from "@/shared/api/constants";
import { Credentials } from "@/shared/types/schemas";

export async function addProjectTag({
  projectId,
  tagId,
  login,
  password,
}: {
  projectId: string;
  tagId: number;
} & Credentials) {
  const res = await fetch(
    `${API_URL}/admin/projects/${projectId}/tags/add?tagId=${encodeURIComponent(
      tagId
    )}`,
    {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${login}:${password}`),
      },
    }
  );

  if (!res.ok) throw new Error("Не удалось добавить тег к проекту");
}
