import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { authApi } from "../api/authApi";

const AuthContext = createContext(null);

const TOKEN_KEY = "vexora_token";
const MANAGER_KEY = "vexora_manager";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [manager, setManager] = useState(() => {
    try {
      const stored = localStorage.getItem(MANAGER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = !!token && !!manager;

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authApi.login(email, password);
      const { token: newToken, manager: newManager } = res.data;

      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(MANAGER_KEY, JSON.stringify(newManager));

      setToken(newToken);
      setManager(newManager);
      return { success: true };
    } catch (err) {
      const msg = err.message || "Login failed. Please try again.";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(MANAGER_KEY);
    setToken(null);
    setManager(null);
  }, []);

  // Validate token on mount — clear if expired
  useEffect(() => {
    if (!token) return;
    authApi.getMe().catch(() => {
      logout();
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{ token, manager, isAuthenticated, isLoading, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
