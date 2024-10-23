import data from "./data.json";

export function fetchTracks() {
  return fetch(`${import.meta.env.API_URL}/tracks`)
    .then((res) => {
      return res.json();
    })
    .catch(() => {
      return data.tracks;
    });
}
