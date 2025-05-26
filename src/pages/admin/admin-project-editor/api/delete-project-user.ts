import { API_URL } from "@/shared/api/constants";
import { Credentials } from "@/shared/types/schemas";

export async function deleteProjectUser({
  projectId,
  userId,
  login,
  password,
}: {
  projectId: string;
  userId: number;
} & Credentials) {
  const res = await fetch(
    `${API_URL}/admin/projects/${projectId}/users/remove?userId=${encodeURIComponent(
      userId
    )}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa(`${login}:${password}`),
      },
    }
  );

  if (!res.ok) throw new Error("Не удалось удалить участника");
}
