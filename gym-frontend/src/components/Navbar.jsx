import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="backdrop-blur-sm bg-black/90 border-b border-gray-800 sticky top-0 z-50 font-mac">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold text-white hover:text-gray-300 transition-colors"
          >
            Fit<span className="text-gray-400">Near</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-3">
            {!token ? (
              <>
                {/* Login: White background, black text */}
                <Link
                  to="/Login"
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-white text-black 
                             hover:bg-gray-100 hover:scale-105 hover:shadow-md transition-all duration-200"
                >
                  Login
                </Link>

                {/* Signup: Black background, white text */}
                <Link
                  to="/Signup"
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-black text-white 
                             hover:bg-gray-900 hover:scale-105 hover:shadow-md transition-all duration-200"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 
                           hover:bg-red-700 hover:scale-105 hover:shadow-md text-white 
                           transition-all duration-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
