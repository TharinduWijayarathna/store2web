import { apiFetch } from "./client";
import type { MeResponse, User } from "./types";

const register = (payload: {
  name: string;
  email: string;
  password: string;
}) =>
  apiFetch<{ user: User }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

const login = (payload: { email: string; password: string }) =>
  apiFetch<{ user: User }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

const logout = () =>
  apiFetch<{ ok: boolean }>("/auth/logout", { method: "POST" });

const getMe = () => apiFetch<MeResponse>("/auth/me");

export { register, login, logout, getMe };
