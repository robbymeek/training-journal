export const FITNESS_CATEGORIES = [
  { id: "cardio_base", label: "Cardio — Base (Z1–Z2)", short: "Cardio Base", color: "#22d3ee" },
  { id: "cardio_threshold", label: "Cardio — Threshold (Z3)", short: "Cardio Threshold", color: "#facc15" },
  { id: "cardio_hiit", label: "Cardio — HIIT (Z4–Z5)", short: "Cardio HIIT", color: "#ef4444" },
  { id: "upper_body", label: "Upper Body", short: "Upper Body", color: "#a78bfa" },
  { id: "lower_body", label: "Lower Body", short: "Lower Body", color: "#f97316" },
  { id: "core", label: "Core", short: "Core", color: "#3b82f6" },
  { id: "hiking_bench", label: "Hiking Bench", short: "Hiking Bench", color: "#06b6d4" },
  { id: "mobility", label: "Mobility / Recovery", short: "Mobility", color: "#4ade80" },
]

export const EFFORT_LEVELS = [
  { val: 1, label: "Easy", color: "#4ade80" },
  { val: 2, label: "Moderate", color: "#22d3ee" },
  { val: 3, label: "Hard", color: "#facc15" },
  { val: 4, label: "Very Hard", color: "#f97316" },
  { val: 5, label: "Max", color: "#ef4444" },
]

export const WIND_CONDITIONS = [
  "Super Light (0–5 kt)",
  "Light (5–10 kt)",
  "Medium (10–18 kt)",
  "Heavy (18–25 kt)",
  "Super Heavy (25+ kt)",
]

export const SESSION_TYPES = [
  "Solo Practice",
  "Group Practice",
  "Coached Session",
  "Regatta",
  "Sailing with another boat",
]

export const SAILING_TOPICS = [
  "Starts", "Upwind", "Reaching", "Downwind",
  "Mark Roundings", "Tacks", "Gybes", "Boat Handling",
  "Mental Game", "Fitness on Water", "Current / Tide",
  "Rules / Protests", "Rig Tuning", "Visualization",
]

export const KB_WIND_CATEGORIES = [
  "Super Light Air", "Light Air", "Medium Breeze", "Heavy Air", "Super Heavy Air",
]

export const KB_BOATHANDLING_SUBS = [
  { id: "mark_roundings", label: "Mark Roundings" },
  { id: "tacks", label: "Tacks" },
  { id: "gybes", label: "Gybes" },
]

export const KB_SAILING_SUBS = [
  { id: "upwind", label: "Upwind" },
  { id: "reaching", label: "Reaching" },
  { id: "downwind", label: "Downwind" },
]

export const KB_CONCEPT_SUBS = [
  { id: "mental", label: "Mental", children: [
    { id: "visualization", label: "Visualization" },
  ]},
  { id: "fitness_info", label: "Fitness Info" },
  { id: "current_tide", label: "Current / Tide" },
  { id: "rules_protests", label: "Rules / Protests" },
]

export function windToCategory(wind: string): string {
  if (wind.includes("0–5")) return "Super Light Air"
  if (wind.includes("5–10")) return "Light Air"
  if (wind.includes("10–18")) return "Medium Breeze"
  if (wind.includes("18–25")) return "Heavy Air"
  if (wind.includes("25+")) return "Super Heavy Air"
  return "Medium Breeze"
}
