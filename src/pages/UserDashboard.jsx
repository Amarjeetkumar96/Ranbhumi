import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getUserRegistrations, formatDate, isRegistrationOpen } from "../services/tournaments";

function UserDashboard() {
  const { user } = useAuth();
  const [myTournaments, setMyTournaments] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      const regs = await getUserRegistrations(user.id);
      setMyTournaments(regs);
    })();
  }, [user?.id]);

  return (
    <div>
      <h1 className="page-title">Welcome, {user?.name || "Player"}</h1>
      <h2 className="text-xl mb-2">My Tournaments</h2>
      <ul className="space-y-3">
        {myTournaments.length === 0 && (
          <li className="bg-slate-700 p-4 rounded-lg text-gray-300">No registrations yet</li>
        )}
        {myTournaments.map((t) => (
          <li key={t.id} className="bg-slate-700 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{t.name}</span>
              <span className="badge">{t.paid ? `Paid $${t.fee}` : "Free"}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">Event: {formatDate(t.date)} • Closes: {formatDate(t.registrationDeadline)}</div>
            <div className={`mt-2 text-sm ${isRegistrationOpen(t) ? 'text-yellow-300' : 'text-gray-400'}`}>
              {isRegistrationOpen(t) ? "Registered (upcoming)" : "Registered (closed)"}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link to="/team" className="btn-primary">Manage Team</Link>
      </div>
    </div>
  );
}

export default UserDashboard;