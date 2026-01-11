import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser, logoutUser } from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from local storage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("mc_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from local storage:", error);
      localStorage.removeItem("mc_user");
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      setUser(data.user);
      localStorage.setItem("mc_user", JSON.stringify(data.user));
      localStorage.setItem("access_token", data.access_token);
      return data.user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signup = async (data) => {
    try {
      const response = await registerUser(data);

      // Auto-login if token is present
      if (response.access_token && response.user) {
        localStorage.setItem("mc_user", JSON.stringify(response.user));
        localStorage.setItem("access_token", response.access_token);
        setUser(response.user);
        return response.user;
      } else if (response.user) {
        // Fallback if backend doesn't return token (shouldn't happen with recent fix)
        return response.user;
      }
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const logout = () => {
    logoutUser();
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
