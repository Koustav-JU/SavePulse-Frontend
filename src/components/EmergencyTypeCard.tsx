interface EmergencyTypeCardProps {
  emoji: string;
  title: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function EmergencyTypeCard({
  emoji,
  title,
  description,
  selected = false,
  onClick,
}: EmergencyTypeCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex min-h-[80px] w-full flex-col items-center justify-center gap-1 rounded-2xl border-2 p-3 text-center transition-all active:scale-95 ${
        selected
          ? "border-red-500 bg-red-50 shadow-md dark:bg-red-950/40 dark:border-red-400"
          : "border-gray-200 bg-white hover:border-red-300 hover:bg-red-50/50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-red-700 dark:hover:bg-red-950/20"
      }`}
    >
      <span className="text-3xl leading-none">{emoji}</span>
      <span
        className={`text-xs font-semibold leading-tight ${
          selected
            ? "text-red-700 dark:text-red-300"
            : "text-gray-800 dark:text-slate-200"
        }`}
      >
        {title}
      </span>
      {description && (
        <span className="text-xs text-gray-500 dark:text-slate-400 leading-tight hidden sm:block">
          {description}
        </span>
      )}
    </button>
  );
}
