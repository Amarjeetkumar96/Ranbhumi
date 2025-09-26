import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTournamentById, isRegistrationOpen, joinTournament, formatDate } from "../services/tournaments";
import { useAuth } from "../context/AuthContext";

function TournamentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [tournament, setTournament] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const open = isRegistrationOpen(tournament);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getTournamentById(id);
        if (mounted) setTournament(data);
      } catch (e) {
        if (mounted) setError("Tournament not found or server unavailable");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const handleJoin = async () => {
    if (!isAuthenticated) return alert("Please login to join");
    try {
      if (tournament.paid) {
        // Simple mock payment flow
        const ok = confirm(`This is a paid event. Pay $${tournament.fee} to join?`);
        if (!ok) return;
      }
      await joinTournament(tournament.id, user);
      alert("Registered successfully!");
      navigate("/dashboard");
    } catch (e) {
      alert(e.message || "Failed to register");
    }
  };

  if (loading) return <div className="card">Loading...</div>;
  if (error || !tournament) return <div className="card">{error || "Tournament not found"}</div>;

  return (
    <div className="card">
      <h1 className="text-3xl font-bold text-yellow-400 mb-2">{tournament.name}</h1>
      <p className="text-gray-300">Game: {tournament.game}</p>
      <p className="text-gray-400">Event: {formatDate(tournament.date)}</p>
      <p className="text-gray-400">Registration closes: {formatDate(tournament.registrationDeadline)}</p>
      <p className="mt-4">{tournament.description}</p>
      <div className="mt-2">
        <span className="badge">{tournament.paid ? `Paid $${tournament.fee}` : "Free"}</span>
      </div>
      <button disabled={!open} onClick={handleJoin} className="mt-6 btn-primary disabled:opacity-50">
        {open ? (tournament.paid ? `Pay & Join` : `Join Now`) : `Registration Closed`}
      </button>
    </div>
  );
}

export default TournamentDetails;