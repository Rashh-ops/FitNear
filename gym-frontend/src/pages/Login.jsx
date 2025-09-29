import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Get redirect path from query params or default to home
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirect") || "/";

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        formData
      );

      // store JWT token in localStorage
      localStorage.setItem("token", res.data.token);

      // 🔹 Redirect to original page after login
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="flex justify-center px-4 py-16 flex-grow">
        <form
          onSubmit={handleSubmit}
          className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/50"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Welcome Back
          </h2>

          {error && (
            <p className="text-red-500 mb-4 text-center text-sm">{error}</p>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* 🔹 Black button for consistency */}
          <button
            type="submit"
            className="w-full bg-black/90 hover:bg-black text-white py-2 rounded-lg font-semibold transition-colors shadow-md"
          >
            Login
          </button>

          {/* Signup link */}
          <p className="text-center text-gray-700 mt-4">
            New user?{" "}
            <Link
              to="/signup"
              className="text-black hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
