import { API_URL } from "@/shared/api/constants";
import { Credentials } from "@/shared/types/schemas";

export async function updateProjectDate({
  projectId,
  dateId,
  login,
  password,
}: {
  projectId: string;
  dateId: number;
} & Credentials) {
  const res = await fetch(
    `${API_URL}/admin/projects/${projectId}/date?dateId=${encodeURIComponent(
      dateId
    )}`,
    {
      method: "PATCH",
      headers: {
        Authorization: "Basic " + btoa(`${login}:${password}`),
      },
    }
  );

  if (!res.ok) {
    throw new Error("Произошла ошибка при изменении даты");
  }
}
