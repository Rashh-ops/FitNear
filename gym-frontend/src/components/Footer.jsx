// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Name */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold">GymFinder</h1>
          <p className="text-sm text-gray-400">Find the best gyms near you</p>
        </div>

        {/* Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/gyms" className="hover:text-white transition">Gyms</a>
          <a href="/about" className="hover:text-white transition">About</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
        </div>

        {/* Social Icons (optional) */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white transition">📘</a>
          <a href="#" className="hover:text-white transition">🐦</a>
          <a href="#" className="hover:text-white transition">📸</a>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} FitNear. All rights reserved.
      </div>
    </footer>
  );
}
