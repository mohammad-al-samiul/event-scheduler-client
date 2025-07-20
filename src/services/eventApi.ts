import { api } from "../api";

const API_BASE = import.meta.env.BASE_URL;

export const fetchEvents = async (): Promise<Event[]> => {
  const res = await api.get(`${API_BASE}/events`);
  return res.data;
};

export const createEvent = async (event: Partial<Event>) => {
  const res = await api.post(`${API_BASE}/events`, event);
  return res.data;
};

export const deleteEvent = async (id: string) => {
  return await api.delete(`${API_BASE}/events/${id}`);
};

export const toggleArchive = async (id: string) => {
  return await api.patch(`${API_BASE}/events/${id}/archive`);
};
