import data from "./data.json";

export function fetchProjects() {
  return fetch(`${import.meta.env.API_URL}/projects`)
    .then((res) => {
      return res.json();
    })
    .catch(() => {
      return data.projects;
    });
}
