import { api } from "./api";

export async function getTournaments() {
  return await api.get("/api/tournaments");
}

export async function getTournamentById(id) {
  const clean = String(id).trim();
  try {
    return await api.get(`/api/tournaments/${encodeURIComponent(clean)}`);
  } catch (e) {
    // Fallback: fetch all and find locally in case of serialization/id mismatches
    const all = await getTournaments();
    const numId = Number(clean);
    return all.find((t) => String(t.id) === clean || Number(t.id) === numId);
  }
}

export async function createTournament({ name, game, date, registrationDeadline, description, paid, fee }) {
  return await api.post("/api/tournaments", { name, game, date, registrationDeadline, description, paid, fee });
}

export async function updateTournament(id, { name, game, date, registrationDeadline, description, paid, fee }) {
  return await api.put(`/api/tournaments/${id}`, { name, game, date, registrationDeadline, description, paid, fee });
}

export async function deleteTournament(id) {
  return await api.delete(`/api/tournaments/${id}`);
}

export function isRegistrationOpen(tournament) {
  if (!tournament?.registrationDeadline) return true;
  return new Date(tournament.registrationDeadline).getTime() > Date.now();
}

export async function getUserRegistrations(userId) {
  const regs = await api.get(`/api/registrations/user/${userId}`);
  return regs.map((r) => r.tournament);
}

export async function joinTournament(tournamentId, user) {
  if (!user?.id) throw new Error("Not authenticated");
  return await api.post("/api/registrations/join", { userId: user.id, tournamentId });
}

export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}


