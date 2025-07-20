export interface Event {
  _id?: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  archived: boolean;
  category: "Work" | "Personal" | "Other";
}
