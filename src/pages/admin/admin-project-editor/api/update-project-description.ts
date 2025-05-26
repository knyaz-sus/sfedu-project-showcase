import { API_URL } from "@/shared/api/constants";
import { Credentials } from "@/shared/types/schemas";

export async function updateProjectDescription({
  projectId,
  description,
  login,
  password,
}: {
  projectId: string;
  description: string;
} & Credentials) {
  const res = await fetch(
    `${API_URL}/admin/projects/${projectId}/description?description=${encodeURIComponent(
      description
    )}`,
    {
      method: "PATCH",
      headers: {
        Authorization: "Basic " + btoa(`${login}:${password}`),
      },
    }
  );

  if (!res.ok) {
    throw new Error("Произошла ошибка при изменении описания");
  }
}
