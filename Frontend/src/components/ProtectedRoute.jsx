import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowRoles }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/Ranbhumi/login" replace />;
  }

  if (allowRoles && !allowRoles.includes(role)) {
    return <Navigate to="/Ranbhumi" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;


