"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import EmergencyTypeCard from "@/components/EmergencyTypeCard";
import BottomNav from "@/components/BottomNav";
import { emergencyTypes } from "@/data/emergencyTypes";

const TOTAL_STEPS = 3;

function EmergencyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") ?? "";

  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(initialType);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [numPatients, setNumPatients] = useState(1);
  const [locationNote, setLocationNote] = useState(
    "12 Riverside Drive, Downtown (auto-detected)"
  );

  function nextStep() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }
  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function handleFindHospitals() {
    const params = new URLSearchParams({
      type: selectedType,
      name: patientName,
      age: patientAge,
      symptoms,
      numPatients: String(numPatients),
      location: locationNote,
    });
    router.push(`/emergency/hospitals?${params}`);
  }

  const selectedEmergency = emergencyTypes.find((t) => t.id === selectedType);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-950">
      <Header title="Request Ambulance" showBack />

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 pb-28 pt-6">
        {/* Progress indicator */}
        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div key={i} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  i + 1 <= step
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-500 dark:bg-slate-700 dark:text-slate-400"
                }`}
              >
                {i + 1}
              </div>
              {i < TOTAL_STEPS - 1 && (
                <div
                  className={`h-1 flex-1 rounded transition-colors ${
                    i + 1 < step
                      ? "bg-red-500"
                      : "bg-gray-200 dark:bg-slate-700"
                  }`}
                />
              )}
            </div>
          ))}
          <span className="ml-2 text-sm text-gray-500 dark:text-slate-400">
            {step}/{TOTAL_STEPS}
          </span>
        </div>

        {/* Step 1: Emergency Type */}
        {step === 1 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              What is the emergency?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {emergencyTypes.map((type) => (
                <EmergencyTypeCard
                  key={type.id}
                  emoji={type.emoji}
                  title={type.name}
                  selected={selectedType === type.id}
                  onClick={() => setSelectedType(type.id)}
                />
              ))}
            </div>
            <button
              onClick={nextStep}
              disabled={!selectedType}
              className="mt-2 h-14 w-full rounded-2xl bg-red-600 text-base font-bold text-white shadow transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-slate-700"
            >
              Continue
            </button>
          </section>
        )}

        {/* Step 2: Patient Details */}
        {step === 2 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Patient Details
            </h2>
            {selectedEmergency && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 dark:bg-red-950/30">
                <span className="text-2xl">{selectedEmergency.emoji}</span>
                <span className="font-semibold text-red-700 dark:text-red-300">
                  {selectedEmergency.name}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-slate-300">
                  Patient Name (optional)
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:ring-red-900"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-slate-300">
                  Approximate Age
                </label>
                <input
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder="e.g. 45"
                  min={0}
                  max={120}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:ring-red-900"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-slate-300">
                  Describe Symptoms
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Brief description of symptoms or situation…"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-base placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:ring-red-900"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={prevStep}
                className="flex-1 h-14 rounded-2xl border border-gray-300 bg-white text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="flex-[2] h-14 rounded-2xl bg-red-600 text-base font-bold text-white shadow transition-colors hover:bg-red-700"
              >
                Continue
              </button>
            </div>
          </section>
        )}

        {/* Step 3: Location & Patients */}
        {step === 3 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Confirm Location
            </h2>

            <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-700 dark:text-slate-300">
                    Detected Location
                  </p>
                  <p className="mt-0.5 text-sm text-gray-600 dark:text-slate-400">
                    {locationNote}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700 dark:text-slate-300">
                Or enter address manually
              </label>
              <input
                type="text"
                value={locationNote}
                onChange={(e) => setLocationNote(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:ring-red-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
                Number of Patients
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setNumPatients((n) => Math.max(1, n - 1))}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-xl font-bold text-gray-700 hover:bg-gray-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                >
                  −
                </button>
                <span className="w-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
                  {numPatients}
                </span>
                <button
                  onClick={() => setNumPatients((n) => Math.min(10, n + 1))}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-xl font-bold text-gray-700 hover:bg-gray-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={prevStep}
                className="flex-1 h-14 rounded-2xl border border-gray-300 bg-white text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                Back
              </button>
              <button
                onClick={handleFindHospitals}
                className="flex-[2] h-14 rounded-2xl bg-red-600 text-base font-bold text-white shadow transition-colors hover:bg-red-700"
              >
                Find Nearest Hospitals
              </button>
            </div>
          </section>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

export default function EmergencyPage() {
  return (
    <Suspense>
      <EmergencyPageContent />
    </Suspense>
  );
}
