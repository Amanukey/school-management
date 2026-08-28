import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("acrs_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem("acrs_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
      } catch (_error) {
        localStorage.removeItem("acrs_token");
        localStorage.removeItem("acrs_user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    localStorage.setItem("acrs_token", data.token);
    localStorage.setItem("acrs_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const teacherLogin = async (payload) => {
    const { data } = await api.post("/auth/teacher-login", payload);
    localStorage.setItem("acrs_token", data.token);
    localStorage.setItem("acrs_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const teacherRegister = async (payload) => {
    const { data } = await api.post("/auth/teacher-register", payload);
    localStorage.setItem("acrs_token", data.token);
    localStorage.setItem("acrs_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("acrs_token");
    localStorage.removeItem("acrs_user");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, teacherLogin, teacherRegister, logout, isAuthenticated: Boolean(user) }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
