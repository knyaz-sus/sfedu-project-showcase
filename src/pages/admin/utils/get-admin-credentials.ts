export function getAdminCredentials() {
  const login = window.prompt("Введите логин");
  if (!login) throw new Error("Вы пропустили ввод логина");
  const password = window.prompt("Введите пароль");
  if (!password) throw new Error("Вы пропустили ввод  пароля");
  return { login, password };
}
