import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(""); // new token input state

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { username }; // prepare user data object

    login(userData, token); // pass both username and token to context login
    navigate("/"); // redirect to homepage after login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          required
        />

        <input
          type="text"
          placeholder="Enter token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
