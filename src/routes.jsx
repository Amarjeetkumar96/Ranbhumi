import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TournamentDetails from "./pages/TournamentDetails";
import Leaderboard from "./pages/Leaderboard";
import Schedule from "./pages/Schedule";
import TeamManagement from "./pages/TeamManagement";

export const publicRoutes = [
  { path: "/Ranbhumi", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/tournament/:id", element: <TournamentDetails /> },
  { path: "/leaderboard", element: <Leaderboard /> },
  { path: "/schedule", element: <Schedule /> },
];

export const protectedUserRoutes = [
  { path: "/dashboard", element: <UserDashboard /> },
  { path: "/team", element: <TeamManagement /> },
];

export const protectedAdminRoutes = [
  { path: "/admin", element: <AdminDashboard /> },
];


