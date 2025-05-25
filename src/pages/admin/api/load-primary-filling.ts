import { API_URL } from "@/shared/api/constants";

function createFormData(date: string, track: string, files: File[]) {
  const formData = new FormData();
  formData.append("date", date);
  formData.append("track", track);
  files.forEach((file) => formData.append("files", file));
  return formData;
}

export async function loadPrimaryFilling(
  date: string,
  track: string,
  files: File[]
) {
  const res = await fetch(`${API_URL}/admin/primary_filling`, {
    method: "POST",
    body: createFormData(date, track, files),
    headers: {
      Authorization: "Basic " + btoa(`admin:admin`),
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Что-то пошло не так");
}
