import StatusBadge from "./StatusBadge";
import type { AvailabilityStatus } from "@/data/hospitals";

interface HospitalCardProps {
  name: string;
  distance: string;
  specializations: string[];
  availability: AvailabilityStatus;
  etaMinutes: number;
  onSelect?: () => void;
}

export default function HospitalCard({
  name,
  distance,
  specializations,
  availability,
  etaMinutes,
  onSelect,
}: HospitalCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {name}
          </h3>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-slate-400">
            📍 {distance}
          </p>
        </div>
        <StatusBadge status={availability} />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {specializations.slice(0, 3).map((spec) => (
          <span
            key={spec}
            className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
          >
            {spec}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-slate-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>~{etaMinutes} min arrival</span>
        </div>

        <button
          onClick={onSelect}
          disabled={availability === "full"}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
            availability === "full"
              ? "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-slate-700 dark:text-slate-500"
              : "bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
          }`}
        >
          {availability === "full" ? "Full" : "Select & Dispatch"}
        </button>
      </div>
    </div>
  );
}
