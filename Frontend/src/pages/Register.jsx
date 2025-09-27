import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(name, email, password, role);
      navigate(role === "admin" ? "/Ranbhumi/admin" : "/Ranbhumi/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Register</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="w-full p-2 rounded bg-slate-700 border border-gray-600" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full p-2 rounded bg-slate-700 border border-gray-600" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 rounded bg-slate-700 border border-gray-600" />
        <div className="flex items-center gap-4 text-sm">
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="role" value="user" checked={role === "user"} onChange={() => setRole("user")} />
            <span>User</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="role" value="admin" checked={role === "admin"} onChange={() => setRole("admin")} />
            <span>Admin</span>
          </label>
        </div>
        <button type="submit" className="w-full btn-primary">Create Account</button>
        <p className="text-sm text-gray-300">Have an account? <Link to="/login" className="text-yellow-300 underline">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;