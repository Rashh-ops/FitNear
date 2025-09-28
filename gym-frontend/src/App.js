import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GymDetails from "./pages/GymDetails";
import Signup from "./pages/Signup";   // 👈 add your signup page
import Login from "./pages/Login";
import Navbar from "./components/Navbar";     // 👈 add your login page
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />   {/* 👈 always on top */}
      <div className="p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/gym/:id" element={<GymDetails />} />

          {/* Auth Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
