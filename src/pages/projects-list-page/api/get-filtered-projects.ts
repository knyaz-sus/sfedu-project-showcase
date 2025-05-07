import { fetchWithValidation } from "@/shared/api/fetch-with-validation";
import { projectsSchema } from "@/shared/types/schemas";
import { Filters } from "@/app/providers/filters/filters-context";

export async function getFilteredProjects({ tags, track, date }: Filters) {
  const params = new URLSearchParams();

  tags?.forEach((tag) => params.append("tags", tag));
  if (track) params.append("track", track);
  if (date) params.append("date", date);

  const url =
    params.size === 0 ? "/projects" : `/projects/filter?${params.toString()}`;
  console.log(url);

  try {
    return await fetchWithValidation(projectsSchema, url);
  } catch (e) {
    console.log(e);
    throw new Error("Не удалось загрузить проекты");
  }
}
