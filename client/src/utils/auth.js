export function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function removeToken() {
  localStorage.removeItem("token");
  return;
}
