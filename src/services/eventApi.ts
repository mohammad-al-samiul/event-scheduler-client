import { api } from "../api";
import type { Event } from "../types";

export const fetchEvents = async (): Promise<Event[]> => {
  const res = await api.get(`/events`);
  return res.data.data;
};

export const createEvent = async (event: Partial<Event>) => {
  const res = await api.post(`/events`, event);
  return res.data.data;
};

export const deleteEvent = async (id: string) => {
  return await api.delete(`/events/${id}`);
};

export const toggleArchive = async (id: string) => {
  return await api.patch(`/events/${id}`);
};
