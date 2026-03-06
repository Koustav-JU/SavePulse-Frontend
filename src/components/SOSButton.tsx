interface SOSButtonProps {
  onClick?: () => void;
  label?: string;
}

export default function SOSButton({
  onClick,
  label = "Request Ambulance",
}: SOSButtonProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulse ring */}
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-30" />
      <button
        onClick={onClick}
        className="sos-button-pulse relative flex h-36 w-36 flex-col items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-transform active:scale-95 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-offset-2"
      >
        <span className="text-4xl leading-none">🚑</span>
        <span className="mt-1 text-center text-xs font-bold leading-tight px-2 uppercase tracking-wide">
          {label}
        </span>
      </button>
    </div>
  );
}
