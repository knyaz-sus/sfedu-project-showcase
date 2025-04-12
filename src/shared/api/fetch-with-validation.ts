import { ZodSchema } from "zod";
import { API_URL } from "@/shared/api/constants";

export async function fetchWithValidation<T>(
  schema: ZodSchema<T>,
  path: string,
  credentials: RequestCredentials = "include"
) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials,
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data: unknown = await res.json();
  const valdatedData = schema.safeParse(data);
  if (valdatedData.success) return valdatedData.data;
  throw valdatedData.error;
}
