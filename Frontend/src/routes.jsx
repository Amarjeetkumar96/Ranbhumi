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
  { path: "/Ranbhumi/login", element: <Login /> },
  { path: "/Ranbhumi/register", element: <Register /> },
  { path: "/Ranbhumi/tournament/:id", element: <TournamentDetails /> },
  { path: "/Ranbhumi/leaderboard", element: <Leaderboard /> },
  { path: "/Ranbhumi/schedule", element: <Schedule /> },
];

export const protectedUserRoutes = [
  { path: "/Ranbhumi/dashboard", element: <UserDashboard /> },
  { path: "/Ranbhumi/team", element: <TeamManagement /> },
];

export const protectedAdminRoutes = [
  { path: "/Ranbhumi/admin", element: <AdminDashboard /> },
];
