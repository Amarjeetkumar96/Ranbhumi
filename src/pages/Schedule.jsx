import { useEffect, useState } from "react";
import { getSchedule } from "../services/schedule";

function Schedule() {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    (async () => setMatches(await getSchedule()))();
  }, []);

  return (
    <div>
      <h1 className="page-title">Match Schedule</h1>
      <ul className="space-y-4">
        {matches.map((m) => (
          <li key={m.id} className="bg-slate-700 p-4 rounded-lg shadow hover:bg-slate-600">
            <p className="font-semibold">{m.title}</p>
            <p className="text-gray-400">{new Date(m.time).toLocaleString()}</p>
          </li>
        ))}
        {matches.length === 0 && (
          <li className="bg-slate-700 p-4 rounded-lg text-gray-300">No matches scheduled</li>
        )}
      </ul>
    </div>
  );
}

export default Schedule;