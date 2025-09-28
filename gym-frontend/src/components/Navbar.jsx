import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-xl sm:text-2xl hover:text-blue-200 transition-colors"
        >
          FitNear
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4 flex items-center">
          {!token ? (
            <>
              <Link
                to="/Login"
                className="px-3 py-1 rounded hover:bg-blue-500 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/Signup"
                className="px-3 py-1 rounded hover:bg-blue-500 transition-colors"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
