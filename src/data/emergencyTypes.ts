export interface EmergencyType {
  id: string;
  emoji: string;
  name: string;
  description: string;
  matchingSpecializations: string[];
}

export const emergencyTypes: EmergencyType[] = [
  {
    id: "cardiac",
    emoji: "🫀",
    name: "Cardiac Emergency",
    description: "Heart attack, chest pain, cardiac arrest",
    matchingSpecializations: ["Cardiac Care", "ICU", "Emergency Medicine"],
  },
  {
    id: "stroke",
    emoji: "🧠",
    name: "Stroke / Neurological",
    description: "Stroke, seizure, loss of consciousness",
    matchingSpecializations: ["Neurology", "Stroke Center", "ICU"],
  },
  {
    id: "trauma",
    emoji: "🩸",
    name: "Accident / Trauma",
    description: "Road accident, fall, severe injury",
    matchingSpecializations: ["Trauma Center", "Surgery", "Emergency Medicine"],
  },
  {
    id: "pediatric",
    emoji: "👶",
    name: "Pediatric Emergency",
    description: "Child in distress, high fever, breathing difficulty",
    matchingSpecializations: ["Pediatric", "NICU", "Emergency Medicine"],
  },
  {
    id: "maternity",
    emoji: "🤰",
    name: "Maternity",
    description: "Labor, pregnancy complications",
    matchingSpecializations: ["Maternity", "NICU", "OB/GYN"],
  },
  {
    id: "burns",
    emoji: "🔥",
    name: "Burns",
    description: "Severe burns, chemical exposure",
    matchingSpecializations: ["Burns Unit", "Trauma Center", "Surgery"],
  },
  {
    id: "poisoning",
    emoji: "💊",
    name: "Poisoning / Overdose",
    description: "Drug overdose, chemical ingestion",
    matchingSpecializations: ["Toxicology", "ICU", "Emergency Medicine"],
  },
  {
    id: "other",
    emoji: "⚡",
    name: "Other Emergency",
    description: "Any other life-threatening emergency",
    matchingSpecializations: ["Emergency Medicine", "ICU"],
  },
];
