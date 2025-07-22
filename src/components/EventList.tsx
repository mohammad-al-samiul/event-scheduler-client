import { useEffect, useState } from "react";
import type { Event } from "../types";
import { api } from "../api";

export const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [error, setError] = useState<string>("");

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
      setFilteredEvents(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load events. Please try again later.");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter handler
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setCategoryFilter(selected);

    if (selected === "All") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.category === selected);
      setFilteredEvents(filtered);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Events</h2>
        <select
          value={categoryFilter}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</div>
      )}

      {filteredEvents.length === 0 && !error ? (
        <p>No events found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredEvents.map((event, i) => (
            <li key={i} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{event.title}</h3>
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
              {event.notes && <p>Notes: {event.notes}</p>}
              {event.category && <p>Category: {event.category}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
