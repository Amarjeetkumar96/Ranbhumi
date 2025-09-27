import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const logged = await login(email, password);
      navigate(logged.role === "admin" ? "/Ranbhumi/admin" : "/Ranbhumi/dashboard");
    } catch (err) {
      setError("Failed to login");
    }
  };

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Login</h2>
      {error && <p className="text-red-400 mb-2">{error}</p>}
      <form className="space-y-4" onSubmit={onSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full p-2 rounded bg-slate-700 border border-gray-600" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 rounded bg-slate-700 border border-gray-600" />
        <button type="submit" className="w-full btn-primary">Login</button>
        <p className="text-sm text-gray-300">No account? <Link to="/Ranbhumi/register" className="text-yellow-300 underline">Register</Link></p>
      </form>
    </div>
  );
}

export default Login;