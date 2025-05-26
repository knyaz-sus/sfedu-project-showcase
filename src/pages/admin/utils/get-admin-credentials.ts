export function getAdminCredentials() {
  const login = window.prompt("Введите логин");
  const password = window.prompt("Введите пароль");

  if (login && password) {
    return { login, password };
  } else {
    throw new Error("Вы пропустили ввод логина или пароля");
  }
}
