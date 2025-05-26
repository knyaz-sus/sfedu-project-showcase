import { API_URL } from "@/shared/api/constants";
import { Credentials } from "@/shared/types/schemas";

export async function updateProjectGrade({
  projectId,
  grade,
  login,
  password,
}: {
  projectId: string;
  grade: string;
} & Credentials) {
  const res = await fetch(
    `${API_URL}/admin/projects/${projectId}/grade?grade=${encodeURIComponent(
      grade
    )}`,
    {
      method: "PATCH",
      headers: {
        Authorization: "Basic " + btoa(`${login}:${password}`),
      },
    }
  );

  if (!res.ok) {
    throw new Error("Произошла ошибка при изменении оценки");
  }
}
