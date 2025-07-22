export type Category = "Work" | "Personal" | "Other";

export interface Event {
  _id?: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category?: Category | undefined;
  archived?: boolean;
}
