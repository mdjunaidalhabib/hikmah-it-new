import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { apiGet, apiPost } from "../lib/api";

const UserAuthContext = createContext(null);

export function UserAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await apiGet("/user/me");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (identifier, password) => {
    const data = await apiPost("/user/login", { identifier, password });
    setUser(data);
    return data;
  };

  const signup = async (payload) => {
    const data = await apiPost("/user/signup", payload);
    setUser(data);
    return data;
  };

  const logout = async () => {
    await apiPost("/user/logout", {});
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ user, loading, login, signup, logout, refresh }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const ctx = useContext(UserAuthContext);
  if (!ctx) throw new Error("useUserAuth must be used within UserAuthProvider");
  return ctx;
}
