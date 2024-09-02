import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isServiceProvider, setIsServiceProvider] = useState(false); // Added state for user type
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/register/", {
        username,
        email,
        password,
        is_service_provider: isServiceProvider, // Send user type as boolean
      });

      if (response.status === 201) {
        const { is_service_provider } = response.data;
        if (is_service_provider) {
          navigate("/services/create"); // Redirect to add service page
        } else {
          navigate("/login"); // Redirect to login page for regular users
        }
      }
    } catch (err) {
      setError("Registration failed, please try again.");
    }
  };

  return (
    <div className="container mx-auto max-w-xl py-24">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          required
        />

        {/* New checkbox for service provider registration */}
        <label className="block mb-4">
          <input
            type="checkbox"
            checked={isServiceProvider}
            onChange={(e) => setIsServiceProvider(e.target.checked)}
            className="mr-2"
          />
          Register as Service Provider
        </label>

        <p className="text-xs">
          Have an account{" "}
          <a href="/login" className="text-blue-500 text-xs">
            Login
          </a>
        </p>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
