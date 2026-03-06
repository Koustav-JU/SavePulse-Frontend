import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const mockUser = {
  name: "Alex Johnson",
  phone: "+1 (555) 234-5678",
  bloodType: "O+",
  dateOfBirth: "1985-06-15",
  allergies: ["Penicillin", "Latex"],
  conditions: ["Hypertension", "Type 2 Diabetes"],
  emergencyContacts: [
    { name: "Sarah Johnson", relation: "Spouse", phone: "+1 (555) 234-8765" },
    { name: "Mike Johnson", relation: "Brother", phone: "+1 (555) 345-6789" },
  ],
};

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-950">
      <Header title="My Profile" showBack={false} />

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-5 px-4 pb-28 pt-6">
        {/* Medical ID Card */}
        <div className="rounded-3xl bg-gradient-to-br from-red-600 to-red-500 p-6 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
                Medical ID
              </p>
              <h2 className="mt-1 text-2xl font-extrabold">{mockUser.name}</h2>
              <p className="mt-0.5 text-sm opacity-90">{mockUser.phone}</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur">
              🩺
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/20 p-3 text-center backdrop-blur">
              <p className="text-xs opacity-80">Blood Type</p>
              <p className="mt-0.5 text-xl font-extrabold">{mockUser.bloodType}</p>
            </div>
            <div className="rounded-2xl bg-white/20 p-3 text-center backdrop-blur">
              <p className="text-xs opacity-80">DOB</p>
              <p className="mt-0.5 text-sm font-bold">
                {new Date(mockUser.dateOfBirth).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="rounded-2xl bg-white/20 p-3 text-center backdrop-blur">
              <p className="text-xs opacity-80">Allergies</p>
              <p className="mt-0.5 text-sm font-bold">{mockUser.allergies.length}</p>
            </div>
          </div>
        </div>

        {/* Allergies */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Allergies
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {mockUser.allergies.map((allergy) => (
              <span
                key={allergy}
                className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300"
              >
                ⚠️ {allergy}
              </span>
            ))}
          </div>
        </div>

        {/* Medical Conditions */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Medical Conditions
          </h3>
          <div className="mt-2 flex flex-col gap-2">
            {mockUser.conditions.map((condition) => (
              <div
                key={condition}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300"
              >
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                {condition}
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Emergency Contacts
          </h3>
          <div className="mt-3 flex flex-col gap-3">
            {mockUser.emergencyContacts.map((contact) => (
              <div key={contact.phone} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {contact.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    {contact.relation} · {contact.phone}
                  </p>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-400 dark:hover:bg-green-900/60"
                  aria-label={`Call ${contact.name}`}
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Edit button */}
        <button className="h-14 w-full rounded-2xl border border-gray-300 bg-white text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
          ✏️ Edit Profile
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
