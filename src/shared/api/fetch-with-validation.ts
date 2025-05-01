import { ZodSchema } from "zod";
import { API_URL } from "@/shared/api/constants";

export async function fetchWithValidation<T>(
  schema: ZodSchema<T>,
  path: string,
  credentials: RequestCredentials = "include"
) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      credentials,
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data: unknown = await res.json();
    return schema.parse(data);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
