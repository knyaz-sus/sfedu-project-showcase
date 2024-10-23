import data from "./data.json";

export function fetchProject(id: number | string) {
  return fetch(`${import.meta.env.API_URL}/projects/${id}`)
    .then((res) => {
      return res.json();
    })
    .catch(() => {
      return data.projects.find(
        (project) => project.id.toString() === id.toString()
      );
    });
}
