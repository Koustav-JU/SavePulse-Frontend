import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { mockHistory } from "@/data/mockHistory";
import type { RequestStatus } from "@/data/mockHistory";

const statusStyles: Record<
  RequestStatus,
  { bg: string; text: string; label: string }
> = {
  Completed: {
    bg: "bg-green-100 dark:bg-green-900/40",
    text: "text-green-700 dark:text-green-300",
    label: "Completed",
  },
  Cancelled: {
    bg: "bg-gray-100 dark:bg-slate-700",
    text: "text-gray-600 dark:text-slate-400",
    label: "Cancelled",
  },
  "In Progress": {
    bg: "bg-yellow-100 dark:bg-yellow-900/40",
    text: "text-yellow-700 dark:text-yellow-300",
    label: "In Progress",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-950">
      <Header title="Emergency History" showBack={false} />

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-4 pb-28 pt-6">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          History
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Your past emergency requests
        </p>

        <div className="flex flex-col gap-3">
          {mockHistory.map((record) => {
            const status = statusStyles[record.status];
            return (
              <div
                key={record.id}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{record.emergencyEmoji}</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {record.emergencyType}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-slate-400">
                        {record.hospitalName}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status.bg} ${status.text}`}
                  >
                    {status.label}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-400 dark:text-slate-500">
                  <span>{formatDate(record.date)}</span>
                  <span>ETA was ~{record.etaMinutes} min</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
