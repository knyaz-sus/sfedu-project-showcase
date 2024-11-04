import data from "./data.json";

export function fetchProjects() {
  return fetch(`https://showcase-g053.onrender.com/projects`)
    .then((res) => {
      return res.json();
    })
    .catch(() => {
      return data.projects;
    });
}
