import type { Event } from "../types";
import { formatDate, formatTime } from "../utils/formatDateTime";

type Props = {
  event: Event;
  onDelete: (id: string) => void;
  onToggleArchive: (id: string) => void;
};

export const EventCard = ({ event, onDelete, onToggleArchive }: Props) => {
  return (
    <div className="bg-white p-4 rounded shadow space-y-2 border">
      <h2 className="text-lg font-semibold">{event.title}</h2>
      <p>Date: {formatDate(event.date)}</p>
      <p>Time: {formatTime(event.time)}</p>
      {event.notes && <p>Notes: {event.notes}</p>}
      <p>
        Category: <span className="font-medium">{event.category}</span>
      </p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onToggleArchive(event._id!)}
          className="px-2 py-1 bg-yellow-400 rounded text-white"
        >
          {event.archived ? "Unarchive" : "Archive"}
        </button>
        <button
          onClick={() => onDelete(event._id!)}
          className="px-2 py-1 bg-red-500 rounded text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
