export type RequestStatus = "Completed" | "Cancelled" | "In Progress";

export interface HistoryRecord {
  id: string;
  date: string;
  emergencyType: string;
  emergencyEmoji: string;
  hospitalName: string;
  status: RequestStatus;
  etaMinutes: number;
}

export const mockHistory: HistoryRecord[] = [
  {
    id: "rec1",
    date: "2026-02-28T14:32:00Z",
    emergencyType: "Cardiac Emergency",
    emergencyEmoji: "🫀",
    hospitalName: "City General Hospital",
    status: "Completed",
    etaMinutes: 6,
  },
  {
    id: "rec2",
    date: "2026-02-15T09:10:00Z",
    emergencyType: "Accident / Trauma",
    emergencyEmoji: "🩸",
    hospitalName: "Metro Trauma Center",
    status: "Completed",
    etaMinutes: 11,
  },
  {
    id: "rec3",
    date: "2026-01-30T22:45:00Z",
    emergencyType: "Pediatric Emergency",
    emergencyEmoji: "👶",
    hospitalName: "Children's Health Institute",
    status: "Completed",
    etaMinutes: 13,
  },
  {
    id: "rec4",
    date: "2026-01-12T07:20:00Z",
    emergencyType: "Stroke / Neurological",
    emergencyEmoji: "🧠",
    hospitalName: "Regional Neuro Center",
    status: "Cancelled",
    etaMinutes: 16,
  },
  {
    id: "rec5",
    date: "2025-12-25T16:05:00Z",
    emergencyType: "Maternity",
    emergencyEmoji: "🤰",
    hospitalName: "Women & Family Hospital",
    status: "Completed",
    etaMinutes: 14,
  },
  {
    id: "rec6",
    date: "2025-12-01T11:55:00Z",
    emergencyType: "Other Emergency",
    emergencyEmoji: "⚡",
    hospitalName: "Downtown Emergency Clinic",
    status: "Completed",
    etaMinutes: 4,
  },
];
