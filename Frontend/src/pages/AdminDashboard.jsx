import { useEffect, useMemo, useState } from "react";
import { createTournament, getTournaments, formatDate, updateTournament, deleteTournament } from "../services/tournaments";

function AdminDashboard() {
  const [form, setForm] = useState({ name: "", game: "", date: "", registrationDeadline: "", description: "", paid: false, fee: 0 });
  const [tournaments, setTournaments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await getTournaments();
      setTournaments(data);
    })();
  }, []);
  const recentClosing = useMemo(() => {
    const now = Date.now();
    return [...tournaments]
      .filter((t) => new Date(t.registrationDeadline).getTime() > now)
      .sort((a, b) => new Date(a.registrationDeadline) - new Date(b.registrationDeadline))
      .slice(0, 3);
  }, [tournaments]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.game || !form.date || !form.registrationDeadline) return;
    
    if (editingId) {
      // Update existing tournament
      const updated = await updateTournament(editingId, form);
      setTournaments((prev) => prev.map(t => t.id === editingId ? updated : t));
      setEditingId(null);
    } else {
      // Create new tournament
      const created = await createTournament(form);
      setTournaments((prev) => [created, ...prev]);
    }
    setForm({ name: "", game: "", date: "", registrationDeadline: "", description: "", paid: false, fee: 0 });
  };

  const handleEdit = (tournament) => {
    setForm({
      name: tournament.name,
      game: tournament.game,
      date: tournament.date,
      registrationDeadline: tournament.registrationDeadline,
      description: tournament.description || "",
      paid: tournament.paid,
      fee: tournament.fee || 0
    });
    setEditingId(tournament.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tournament?")) {
      await deleteTournament(id);
      setTournaments((prev) => prev.filter(t => t.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: "", game: "", date: "", registrationDeadline: "", description: "", paid: false, fee: 0 });
  };

  return (
    <div>
      <h1 className="page-title">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={onSubmit} className="card">
          <h2 className="text-xl font-semibold mb-3">
            {editingId ? "Edit Tournament" : "Create Tournament"}
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <input name="name" value={form.name} onChange={onChange} placeholder="Name" className="p-2 rounded bg-slate-700 border border-gray-600" />
            <input name="game" value={form.game} onChange={onChange} placeholder="Game" className="p-2 rounded bg-slate-700 border border-gray-600" />
            <textarea name="description" value={form.description} onChange={onChange} placeholder="Description" className="p-2 rounded bg-slate-700 border border-gray-600" />
            <label className="text-sm text-gray-300">Event Date
              <input type="datetime-local" name="date" value={form.date} onChange={onChange} className="mt-1 w-full p-2 rounded bg-slate-700 border border-gray-600" />
            </label>
            <label className="text-sm text-gray-300">Registration Deadline
              <input type="datetime-local" name="registrationDeadline" value={form.registrationDeadline} onChange={onChange} className="mt-1 w-full p-2 rounded bg-slate-700 border border-gray-600" />
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="paid" checked={form.paid} onChange={onChange} />
              <span>Paid tournament</span>
            </label>
            {form.paid && (
              <input type="number" step="0.01" name="fee" value={form.fee} onChange={onChange} placeholder="Entry Fee (USD)" className="p-2 rounded bg-slate-700 border border-gray-600" />
            )}
            <div className="flex gap-2">
              <button type="submit" className="btn-primary flex-1">
                {editingId ? "Update" : "Create"}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className="btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="space-y-4">
          <div className="card">
            <h2 className="text-lg font-semibold mb-2">Recent Closing Registrations</h2>
            <ul className="space-y-2">
              {recentClosing.length === 0 && <li className="text-gray-400">No upcoming deadlines</li>}
              {recentClosing.map((t) => (
                <li key={t.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-gray-400">Closes: {formatDate(t.registrationDeadline)}</div>
                  </div>
                  <span className="badge">{t.paid ? `Paid $${t.fee}` : "Free"}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-2">All Tournaments</h2>
            <ul className="space-y-2">
              {tournaments.map((t) => (
                <li key={t.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold">{t.name} <span className="text-xs text-gray-400">({t.game})</span></div>
                    <div className="text-xs text-gray-400">Event: {formatDate(t.date)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge">{t.paid ? `Paid $${t.fee}` : "Free"}</span>
                    <button 
                      onClick={() => handleEdit(t)}
                      className="text-blue-400 hover:text-blue-300 text-sm px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(t.id)}
                      className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;