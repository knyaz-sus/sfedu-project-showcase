import { API_URL } from "@/shared/api/constants";
import { PrimaryFillingSheets } from "../primary-filling";

function createFormData(
  dateId: number,
  trackId: number,
  files: PrimaryFillingSheets
) {
  if (!files.summary || !files.annotation || !files.score) {
    throw new Error("Не все необходимые файлы загружены");
  }
  const formData = new FormData();
  formData.append("date", String(dateId));
  formData.append("track", String(trackId));
  formData.append("summary", files.summary);
  formData.append("annotation", files.annotation);
  formData.append("score", files.score);

  return formData;
}

export async function uploadPrimaryFilling(
  dateId: number,
  trackId: number,
  files: PrimaryFillingSheets
) {
  const res = await fetch(`${API_URL}/admin/primary_filling`, {
    method: "POST",
    body: createFormData(dateId, trackId, files),
    headers: {
      Authorization: "Basic " + btoa(`admin:admin`),
    },
  });
  if (!res.ok) throw new Error("Что-то пошло не так");
}
