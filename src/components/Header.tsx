"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export default function Header({
  title = "SavePulse",
  showBack = false,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🚑</span>
          <span className="text-lg font-bold text-red-600 dark:text-red-400">
            {title}
          </span>
        </Link>
      </div>
    </header>
  );
}
