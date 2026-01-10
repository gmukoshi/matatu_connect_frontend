import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("mc_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (credentials.username === "fail") {
          reject(new Error("Invalid credentials"));
          return;
        }

        const mockUser = {
          id: "123",
          username: credentials.username,
          role: credentials.role || "commuter",
          email: "user@example.com",
        };

        setUser(mockUser);
        localStorage.setItem("mc_user", JSON.stringify(mockUser));
        resolve(mockUser);
      }, 1000); // Simulate network delay
    });
  };

  const signup = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: Date.now().toString(),
          ...data,
          role: "commuter", // Force role, or pass it in data
        };
        setUser(mockUser);
        localStorage.setItem("mc_user", JSON.stringify(mockUser));
        resolve(mockUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mc_user");
    navigate("/login");
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
