// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="backdrop-blur-sm bg-black/90 border-t border-gray-800 py-6 mt-12 font-mac">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Name */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-lg font-semibold text-white">FitNear</h1>
          <p className="text-sm text-gray-300">Find Your Perfect Fitness Spot</p>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm mt-4">
        &copy; {new Date().getFullYear()} FitNear. All rights reserved.
      </div>
    </footer>
  );
}
