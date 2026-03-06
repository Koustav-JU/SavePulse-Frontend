"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import HospitalCard from "@/components/HospitalCard";
import { emergencyTypes } from "@/data/emergencyTypes";
import { hospitals, getRecommendedHospitals } from "@/data/hospitals";
import type { Hospital } from "@/data/hospitals";

function HospitalsPageContent() {
  const searchParams = useSearchParams();
  const typeId = searchParams.get("type") ?? "";
  const location = searchParams.get("location") ?? "Your location";

  const emergency = emergencyTypes.find((t) => t.id === typeId);
  const recommended = emergency
    ? getRecommendedHospitals(emergency.matchingSpecializations)
    : hospitals.slice(0, 5);

  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  const [confirmed, setConfirmed] = useState(false);

  function handleSelect(hospital: Hospital) {
    setSelectedHospital(hospital);
  }

  function handleDispatch() {
    setConfirmed(true);
  }

  if (confirmed && selectedHospital) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-slate-950">
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-800">
          {/* Animated checkmark */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                className="checkmark-path"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Ambulance Dispatched!
            </h1>
            <p className="mt-2 text-gray-500 dark:text-slate-400">
              Help is on the way. Stay calm.
            </p>
          </div>

          <div className="w-full rounded-2xl bg-gray-50 p-4 dark:bg-slate-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-slate-400">
                Hospital
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedHospital.name}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-slate-400">
                Estimated Arrival
              </span>
              <span className="font-bold text-red-600 dark:text-red-400">
                ~{selectedHospital.etaMinutes} minutes
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-slate-400">
                Your Location
              </span>
              <span className="max-w-[180px] text-right font-medium text-gray-700 dark:text-slate-300">
                {location}
              </span>
            </div>
          </div>

          <button className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 text-base font-bold text-white shadow transition-colors hover:bg-blue-700">
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
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Track Your Ambulance
          </button>

          <Link
            href="/"
            className="text-sm font-medium text-gray-500 underline hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (selectedHospital) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-950">
        <Header title="Confirm Dispatch" showBack />
        <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-4 pb-8 pt-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Dispatch to
            </h2>
            <p className="mt-1 text-xl font-extrabold text-red-600 dark:text-red-400">
              {selectedHospital.name}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              {selectedHospital.address}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 p-3 dark:bg-slate-700">
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Distance
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {selectedHospital.distance}
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3 dark:bg-slate-700">
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  ETA
                </p>
                <p className="font-bold text-red-600 dark:text-red-400">
                  ~{selectedHospital.etaMinutes} min
                </p>
              </div>
            </div>
          </div>

          {emergency && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 dark:bg-red-950/30">
              <span className="text-2xl">{emergency.emoji}</span>
              <span className="font-semibold text-red-700 dark:text-red-300">
                {emergency.name}
              </span>
            </div>
          )}

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => setSelectedHospital(null)}
              className="flex-1 h-14 rounded-2xl border border-gray-300 bg-white text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              Change
            </button>
            <button
              onClick={handleDispatch}
              className="flex-[2] h-14 rounded-2xl bg-red-600 text-base font-bold text-white shadow transition-colors hover:bg-red-700"
            >
              Confirm Dispatch
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-950">
      <Header title="Nearby Hospitals" showBack />

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 px-4 pb-8 pt-6">
        {emergency && (
          <div className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 dark:bg-red-950/30">
            <span className="text-2xl">{emergency.emoji}</span>
            <span className="font-semibold text-red-700 dark:text-red-300">
              {emergency.name}
            </span>
          </div>
        )}

        <p className="text-sm text-gray-500 dark:text-slate-400">
          Showing {recommended.length} hospitals sorted by relevance &amp; distance
        </p>

        <div className="flex flex-col gap-3">
          {recommended.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              name={hospital.name}
              distance={hospital.distance}
              specializations={hospital.specializations}
              availability={hospital.availability}
              etaMinutes={hospital.etaMinutes}
              onSelect={() => handleSelect(hospital)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default function HospitalsPage() {
  return (
    <Suspense>
      <HospitalsPageContent />
    </Suspense>
  );
}
