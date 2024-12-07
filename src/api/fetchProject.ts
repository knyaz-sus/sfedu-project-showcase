export async function fetchProject(id: number) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
