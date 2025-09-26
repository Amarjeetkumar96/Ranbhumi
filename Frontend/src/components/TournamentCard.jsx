import { Link } from "react-router-dom";

function TournamentCard({ id, name, date, game, paid, fee, registrationDeadline }) {
  return (
    <div className="relative rounded-xl p-4 transition hover:-translate-y-0.5">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400/40 to-transparent blur opacity-20 group-hover:opacity-30" />
      <div className="glass rounded-xl p-5 relative z-10">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold text-yellow-400">{name}</h2>
          <span className="badge">{game}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <span>Event: {new Date(date).toLocaleDateString()}</span>
          <span>•</span>
          <span>Closes: {new Date(registrationDeadline).toLocaleDateString()}</span>
        </div>
        <div className="mt-2">
          <span className="badge">{paid ? `Paid $${fee}` : "Free"}</span>
        </div>
        <Link to={`/tournament/${id}`} className="mt-3 inline-block btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default TournamentCard;