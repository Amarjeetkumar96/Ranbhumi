import TournamentCard from "../components/TournamentCard";
import Hero from "../components/Hero";
import StatCard from "../components/StatCard";
import { getTournaments } from "../services/tournaments";
import { useEffect, useState } from "react";

function Home() {
  const [tournaments, setTournaments] = useState([]);
  useEffect(() => {
    (async () => setTournaments(await getTournaments()))();
  }, []);

  return (
    <div>
      <Hero />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard label="Players" value="2,340" icon="🧑‍💻" />
        <StatCard label="Teams" value="480" icon="🤝" />
        <StatCard label="Matches" value="1,120" icon="⚔️" />
        <StatCard label="Prizes" value="$42k" icon="🏅" />
      </div>
      <h1 className="page-title" id="tournaments">Upcoming Tournaments</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {tournaments.map((t) => (
          <TournamentCard key={t.id} {...t} />
        ))}
      </div>
    </div>
  );
}

export default Home;