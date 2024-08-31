import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the previous location or default to home
  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);

      // Redirect to the previous page or default home page
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setError("Failed to login.");
    }
  };

  return (
    <div className="container mx-auto max-w-xl py-24">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />
        <p className="text-xs">
          Do not have an account{" "}
          <a href="/signup" className="text-blue-500 text-xs">
            Signup
          </a>
        </p>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
