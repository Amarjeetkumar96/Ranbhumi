import { api } from "./api";

export async function registerUser({ name, email, password, role }) {
  return await api.post("/api/auth/register", { name, email, password, role });
}

export async function loginUser({ email, password }) {
  return await api.post("/api/auth/login", { email, password });
}


