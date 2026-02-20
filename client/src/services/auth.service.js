import api from "./api";

export async function loginUser(credentials) {
  const response = await api.post("/auth/login", credentials);
  const token = response.data.data.token;
  localStorage.setItem("token", token);
  return response.data;
}

export async function registerUser(userData) {
  const response = await api.post("/auth/register", userData);
  return response.data;
}

export async function updateUser(userData) {
  const response = await api.patch("/auth/update", userData);
  return response.data;
}

export async function deleteUser() {
  const response = await api.delete("/auth/delete");
  return response.data;
}
