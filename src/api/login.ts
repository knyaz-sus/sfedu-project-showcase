export async function login() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/oauth2/authorization/github`
    );
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
