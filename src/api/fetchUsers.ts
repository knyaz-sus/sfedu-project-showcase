export async function fetchUsers() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, { credentials: "include" });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
