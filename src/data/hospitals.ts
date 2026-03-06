export type AvailabilityStatus = "available" | "busy" | "full";

export interface Hospital {
  id: string;
  name: string;
  distance: string;
  distanceKm: number;
  specializations: string[];
  availability: AvailabilityStatus;
  etaMinutes: number;
  address: string;
  phone: string;
}

export const hospitals: Hospital[] = [
  {
    id: "h1",
    name: "City General Hospital",
    distance: "1.2 km away",
    distanceKm: 1.2,
    specializations: ["Emergency Medicine", "Cardiac Care", "ICU", "Trauma Center"],
    availability: "available",
    etaMinutes: 5,
    address: "12 Main Street, Downtown",
    phone: "+1 (555) 100-2000",
  },
  {
    id: "h2",
    name: "St. Mary's Medical Center",
    distance: "2.4 km away",
    distanceKm: 2.4,
    specializations: ["Cardiac Care", "Stroke Center", "Neurology", "ICU"],
    availability: "available",
    etaMinutes: 8,
    address: "45 Church Avenue, Midtown",
    phone: "+1 (555) 200-3000",
  },
  {
    id: "h3",
    name: "Metro Trauma Center",
    distance: "3.1 km away",
    distanceKm: 3.1,
    specializations: ["Trauma Center", "Surgery", "Burns Unit", "Emergency Medicine"],
    availability: "busy",
    etaMinutes: 11,
    address: "78 Industrial Road, East Side",
    phone: "+1 (555) 300-4000",
  },
  {
    id: "h4",
    name: "Children's Health Institute",
    distance: "3.8 km away",
    distanceKm: 3.8,
    specializations: ["Pediatric", "NICU", "Pediatric Emergency", "Emergency Medicine"],
    availability: "available",
    etaMinutes: 13,
    address: "22 Park Lane, North District",
    phone: "+1 (555) 400-5000",
  },
  {
    id: "h5",
    name: "Women & Family Hospital",
    distance: "4.2 km away",
    distanceKm: 4.2,
    specializations: ["Maternity", "OB/GYN", "NICU", "Pediatric"],
    availability: "available",
    etaMinutes: 14,
    address: "90 Blossom Street, West End",
    phone: "+1 (555) 500-6000",
  },
  {
    id: "h6",
    name: "Regional Neuro Center",
    distance: "4.7 km away",
    distanceKm: 4.7,
    specializations: ["Neurology", "Stroke Center", "ICU", "Surgery"],
    availability: "busy",
    etaMinutes: 16,
    address: "33 Brain Trust Blvd, Science Quarter",
    phone: "+1 (555) 600-7000",
  },
  {
    id: "h7",
    name: "Poison Control & Toxicology",
    distance: "5.5 km away",
    distanceKm: 5.5,
    specializations: ["Toxicology", "ICU", "Emergency Medicine", "Psychiatry"],
    availability: "available",
    etaMinutes: 18,
    address: "55 Cure Road, South Quarter",
    phone: "+1 (555) 700-8000",
  },
  {
    id: "h8",
    name: "Sunrise Burns & Reconstructive",
    distance: "6.3 km away",
    distanceKm: 6.3,
    specializations: ["Burns Unit", "Reconstructive Surgery", "Trauma Center", "ICU"],
    availability: "full",
    etaMinutes: 21,
    address: "101 Phoenix Way, Uptown",
    phone: "+1 (555) 800-9000",
  },
  {
    id: "h9",
    name: "Downtown Emergency Clinic",
    distance: "0.8 km away",
    distanceKm: 0.8,
    specializations: ["Emergency Medicine", "Minor Surgery"],
    availability: "available",
    etaMinutes: 4,
    address: "7 Quick Care Plaza, Downtown",
    phone: "+1 (555) 900-1000",
  },
  {
    id: "h10",
    name: "Central University Hospital",
    distance: "7.0 km away",
    distanceKm: 7.0,
    specializations: [
      "Emergency Medicine",
      "Cardiac Care",
      "Neurology",
      "Trauma Center",
      "Pediatric",
      "Maternity",
      "Burns Unit",
      "Toxicology",
      "ICU",
      "Surgery",
    ],
    availability: "busy",
    etaMinutes: 23,
    address: "1 University Campus, Academic District",
    phone: "+1 (555) 000-1111",
  },
];

export function getRecommendedHospitals(
  matchingSpecializations: string[],
  limit = 5
): Hospital[] {
  const scored = hospitals.map((hospital) => {
    const score = hospital.specializations.filter((spec) =>
      matchingSpecializations.includes(spec)
    ).length;
    return { hospital, score };
  });

  return scored
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.hospital.distanceKm - b.hospital.distanceKm;
    })
    .filter((item) => item.hospital.availability !== "full" || item.score > 0)
    .slice(0, limit)
    .map((item) => item.hospital);
}
