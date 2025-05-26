import { API_URL } from "@/shared/api/constants";
import { Credentials } from "@/shared/types/schemas";

export async function updateProjectPresentation({
  projectId,
  presentation,
  login,
  password,
}: {
  projectId: string;
  presentation: string;
} & Credentials) {
  const res = await fetch(
    `${API_URL}/admin/projects/${projectId}/presentation?presentation=${encodeURIComponent(
      presentation
    )}`,
    {
      method: "PATCH",
      headers: {
        Authorization: "Basic " + btoa(`${login}:${password}`),
      },
    }
  );

  if (!res.ok) {
    throw new Error("Произошла ошибка при изменении ссылки на презентацию");
  }
}
