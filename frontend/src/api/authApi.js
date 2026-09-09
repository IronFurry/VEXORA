import { api } from "./client";

export const authApi = {
  /** POST /api/auth/login */
  login: (email, password) => api.post("/auth/login", { email, password }),

  /** GET /api/auth/me */
  getMe: () => api.get("/auth/me"),
};
