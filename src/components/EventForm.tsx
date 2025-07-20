import { useState } from "react";
import type { Event } from "../types";

type Props = {
  onSubmit: (data: Partial<Event>) => void;
};

export const EventForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return;
    onSubmit({ title, date, time, description });
    setTitle("");
    setDate("");
    setTime("");
    setDescription("");
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Notes (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Event
      </button>
    </form>
  );
};
