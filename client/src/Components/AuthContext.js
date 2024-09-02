import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a token in localStorage and initialize the user
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      // Fetch user details or set the user from localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Set the user based on localStorage
      } else {
        // Optionally, verify the token with the backend if needed.
        setUser({ username: "defaultUser" }); // Set a default username or fetch
      }
    }

    setLoading(false); // Finish loading after initialization
  }, []);

  const login = async (username, password) => {
    const response = await fetch("https://soft-life-group-1.onrender.com/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify({ username }));

      setUser({ username });
    } else {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}{" "}
      {/* Don't render children until loading is complete */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
