import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,
        form
      );
      localStorage.setItem("token", res.data.token);
      alert("Signup successful!");
      navigate("/"); // ✅ Redirect to Home
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
    }
  };

  return (
    <div className="flex flex-col flex-grow bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Signup Form Section */}
      <div className="flex justify-center px-4 py-16 flex-grow">
        <form
          onSubmit={handleSubmit}
          className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/50"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Create Account
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* 🔥 Black button */}
          <button
            type="submit"
            className="w-full bg-black/90 hover:bg-black text-white py-2 rounded-lg font-semibold transition-colors shadow-md"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-700 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
