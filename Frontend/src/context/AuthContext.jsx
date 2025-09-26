import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { registerUser, loginUser } from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("gtp_auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user || null);
        setRole(parsed.role || "guest");
      } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const safe = await loginUser({ email, password });
    setUser({ id: safe.id, name: safe.name, email: safe.email });
    setRole(safe.role);
    localStorage.setItem("gtp_auth", JSON.stringify({ user: safe, role: safe.role }));
    return safe;
  };

  const register = async (name, email, password, roleInput) => {
    const safe = await registerUser({ name, email, password, role: roleInput });
    setUser({ id: safe.id, name: safe.name, email: safe.email });
    setRole(safe.role);
    localStorage.setItem("gtp_auth", JSON.stringify({ user: safe, role: safe.role }));
    return safe;
  };

  const logout = () => {
    setUser(null);
    setRole("guest");
    localStorage.removeItem("gtp_auth");
  };

  const value = useMemo(
    () => ({ user, role, loading, login, logout, register, isAuthenticated: !!user }),
    [user, role, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


