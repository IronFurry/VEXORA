/**
 * Central fetch wrapper for all VEXORA API calls.
 * - Automatically attaches the Authorization Bearer token from localStorage.
 * - Returns parsed JSON on success.
 * - Throws a structured Error object on failure.
 */

const BASE_URL = "/api";

const getToken = () => localStorage.getItem("vexora_token");

const request = async (method, path, body = null) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, config);
  const data = await response.json();

  if (!response.ok || !data.success) {
    const err = new Error(data.message || "API request failed.");
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
};

export const api = {
  get: (path) => request("GET", path),
  post: (path, body) => request("POST", path, body),
  patch: (path, body) => request("PATCH", path, body),
  delete: (path) => request("DELETE", path),
};
