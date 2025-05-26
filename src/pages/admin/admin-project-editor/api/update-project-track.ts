import { API_URL } from "@/shared/api/constants";
import { Credentials } from "@/shared/types/schemas";

export async function updateProjectTrack({
  projectId,
  trackId,
  login,
  password,
}: {
  projectId: string;
  trackId: number;
} & Credentials) {
  const res = await fetch(
    `${API_URL}/admin/projects/${projectId}/track?trackId=${encodeURIComponent(
      trackId
    )}`,
    {
      method: "PATCH",
      headers: {
        Authorization: "Basic " + btoa(`${login}:${password}`),
      },
    }
  );

  if (!res.ok) {
    throw new Error("Произошла ошибка при изменении трека");
  }
}
