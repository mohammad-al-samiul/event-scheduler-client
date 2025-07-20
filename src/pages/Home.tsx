import { useEffect, useState } from "react";
import { EventForm } from "../components/EventForm";
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  toggleArchive,
} from "../services/eventApi";
import type { Event } from "../types";
import { EventCard } from "../components/EventCard";

export const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const loadEvents = async () => {
    const data = await fetchEvents();

    const sorted = data?.sort((a, b) => {
      return (
        new Date(a.date + "T" + a.time).getTime() -
        new Date(b.date + "T" + b.time).getTime()
      );
    });
    setEvents(sorted);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreate = async (event: Partial<Event>) => {
    await createEvent(event);
    loadEvents();
  };

  const handleDelete = async (id: string) => {
    await deleteEvent(id);
    loadEvents();
  };

  const handleToggle = async (id: string) => {
    await toggleArchive(id);
    loadEvents();
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">🗓️ Event Scheduler</h1>
      <EventForm onSubmit={handleCreate} />
      <div className="mt-6 space-y-4">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onDelete={handleDelete}
            onToggleArchive={handleToggle}
          />
        ))}
      </div>
    </main>
  );
};
