export async function fetchProjects() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
    return await res.json();
  } catch (e) {
    console.log(e)
  }
}
