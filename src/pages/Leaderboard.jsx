import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/leaderboard";

function Leaderboard() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getLeaderboard();
      const sorted = [...data].sort((a, b) => b.points - a.points);
      setRows(sorted.map((r, i) => ({ rank: i + 1, team: r.team, points: r.points })));
    })();
  }, []);

  return (
    <div>
      <h1 className="page-title">Leaderboard</h1>
      <table className="w-full bg-slate-800 rounded-xl overflow-hidden">
        <thead className="bg-slate-700 text-yellow-400">
          <tr>
            <th className="p-2">Rank</th>
            <th className="p-2">Team</th>
            <th className="p-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((team) => (
            <tr key={team.rank} className="border-b border-slate-700 hover:bg-slate-600">
              <td className="p-2 text-center">{team.rank}</td>
              <td className="p-2 text-center">{team.team}</td>
              <td className="p-2 text-center">{team.points}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-400">No entries yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;