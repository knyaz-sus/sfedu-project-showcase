export async function fetchTags() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tags`);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
