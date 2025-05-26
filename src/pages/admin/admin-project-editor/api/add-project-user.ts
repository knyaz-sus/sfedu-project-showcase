import { API_URL } from "@/shared/api/constants";
import { Credentials } from "@/shared/types/schemas";

export async function addProjectUser({
  projectId,
  userId,
  login,
  password,
}: {
  projectId: string;
  userId: number;
} & Credentials) {
  console.log(userId);
  const res = await fetch(
    `${API_URL}/admin/projects/${projectId}/users/add?userId=${encodeURIComponent(
      userId
    )}`,
    {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${login}:${password}`),
      },
    }
  );

  if (!res.ok) throw new Error("Не удалось добавить участника");
}
