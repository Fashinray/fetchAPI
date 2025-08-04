import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import api from "../api/axios"; // adjust path to your axios setup

interface AuthContextType {
  user: any;
  token: string | null;
  login: (userData: any, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("daataslid_token")
  );

  const login = (userData: any, token: string) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("dataslid_token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // ✅ Add this useEffect here inside AuthProvider
  useEffect(() => {
    if (token && !user) {
      const fetchUser = async () => {
        try {
          const res = await api.get("/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          console.error("Invalid token, logging out");
          logout();
        }
      };
      fetchUser();
    }
  }, [token, user]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
