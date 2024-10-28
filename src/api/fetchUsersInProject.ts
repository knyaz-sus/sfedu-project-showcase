import data from "./data.json";

export function fetchUsersInProject(id: number | string) {
  return fetch(`${import.meta.env.API_URL}/projects/${id}/users`)
    .then((res) => {
      return res.json();
    })
    .catch(() => {
      return data.projects
        .find((project) => project.id.toString() === id.toString())
        ?.team.map((user) => {
          return {
            id: user,
            fullName: data.users.find((u) => u.id === user)?.name,
            role: "Роль1",
          };
        });
    });
}
