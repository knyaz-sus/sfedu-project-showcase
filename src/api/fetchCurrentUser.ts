export async function fetchCurrentUser() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
