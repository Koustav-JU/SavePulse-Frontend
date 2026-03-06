import type { AvailabilityStatus } from "@/data/hospitals";

interface StatusBadgeProps {
  status: AvailabilityStatus;
}

const config: Record<
  AvailabilityStatus,
  { label: string; dot: string; bg: string; text: string }
> = {
  available: {
    label: "Available",
    dot: "bg-green-500",
    bg: "bg-green-100 dark:bg-green-900/40",
    text: "text-green-700 dark:text-green-300",
  },
  busy: {
    label: "Busy",
    dot: "bg-yellow-500",
    bg: "bg-yellow-100 dark:bg-yellow-900/40",
    text: "text-yellow-700 dark:text-yellow-300",
  },
  full: {
    label: "Full",
    dot: "bg-red-500",
    bg: "bg-red-100 dark:bg-red-900/40",
    text: "text-red-700 dark:text-red-300",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, dot, bg, text } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${bg} ${text}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
