import { api } from "./api";

export const getSchedule = async () => await api.get("/api/schedule");
export const addMatch = async (match) => await api.post("/api/schedule", match);


