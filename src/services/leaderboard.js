import { api } from "./api";

export const getLeaderboard = async () => await api.get("/api/leaderboard");
export const addLeaderboardEntry = async (entry) => await api.post("/api/leaderboard", entry);


