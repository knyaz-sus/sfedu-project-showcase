import { ZodSchema } from "zod";
import { API_URL } from "@/constants";

export async function fetchWithValidation<T>(
  schema: ZodSchema<T>,
  path: string,
  credentials: RequestCredentials = "include"
) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      credentials,
    });
    const data: unknown = await res.json();
    const valdatedData = schema.safeParse(data);
    if (valdatedData.success) return valdatedData.data;
    console.log(valdatedData.error);
  } catch (e) {
    console.log(e);
  }
}
