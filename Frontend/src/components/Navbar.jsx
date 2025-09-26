import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, role, user, logout } = useAuth();
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("gtp_theme") || "dark";
    setTheme(stored);
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add(stored === "light" ? "theme-light" : "theme-dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("gtp_theme", next);
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add(next === "light" ? "theme-light" : "theme-dark");
  };

  const handleLogout = () => {
    logout();
    navigate("/Ranbhumi");
  };
  return (
    <nav className="bg-slate-800/80 backdrop-blur p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-yellow-400 font-bold text-xl flex items-center gap-2">
          <span>🎮</span>
          <span>GamePortal</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/Ranbhumi" className="hover:text-yellow-300">Home</Link>
          <Link to="/Ranbhumi/leaderboard" className="hover:text-yellow-300">Leaderboard</Link>
          <Link to="/Ranbhumi/schedule" className="hover:text-yellow-300">Schedule</Link>
          {isAuthenticated && (
            <Link to="/Ranbhumi/dashboard" className="hover:text-yellow-300">Dashboard</Link>
          )}
          {role === "admin" && (
            <Link to="/Ranbhumi/admin" className="hover:text-yellow-300">Admin</Link>
          )}
          <button onClick={toggleTheme} className="btn-secondary text-sm px-3 py-1">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          {!isAuthenticated ? (
            <Link to="/Ranbhumi/login" className="hover:text-yellow-300">Login</Link>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">{user?.name}</span>
              <button onClick={handleLogout} className="btn-secondary text-sm px-3 py-1">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;