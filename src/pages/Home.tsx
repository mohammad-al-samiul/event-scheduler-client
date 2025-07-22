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
  const [categoryFilter, setCategoryFilter] = useState("All");

  const loadEvents = async () => {
    const data = await fetchEvents();
    const sorted = data?.sort(
      (a, b) =>
        new Date(a.date + "T" + a.time).getTime() -
        new Date(b.date + "T" + b.time).getTime()
    );
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

  const filteredEvents =
    categoryFilter === "All"
      ? events
      : events.filter((e) => e.category === categoryFilter);

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🗓️ Event Scheduler
      </h1>

      {/* Filter Dropdown */}
      <div className="mb-6 flex justify-end">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <EventForm onSubmit={handleCreate} />

      <div className="mt-6 space-y-4">
        {filteredEvents.length === 0 ? (
          <p className="text-gray-500">
            No events found for selected category.
          </p>
        ) : (
          filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={handleDelete}
              onToggleArchive={handleToggle}
            />
          ))
        )}
      </div>
    </main>
  );
};
