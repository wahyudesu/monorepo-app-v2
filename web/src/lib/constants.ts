// Platform type is now defined in @/components/ui/PlatformIcon
// We import the colors helper from there
export { getPlatformColor, getPlatformBgColor, type Platform } from "@/components/ui/PlatformIcon";

// Legacy emoji icons - kept for backward compatibility, consider removing
export const platformIcons: Record<string, string> = {
  instagram: "📸",
  tiktok: "🎵",
  twitter: "𝕏",
  youtube: "▶️",
  facebook: "📘",
  linkedin: "💼",
  pinterest: "📌",
  threads: "🧵",
  whatsapp: "💬",
  reddit: "🔴",
  bluesky: "☁️",
  google: "🔵",
  telegram: "✈️",
  snapchat: "👻",
};

// Tailwind color classes for platform badges
export const platformColors: Record<string, string> = {
  instagram: "border-pink-500/30 bg-pink-500/5 text-pink-500",
  tiktok: "border-gray-500/30 bg-gray-500/5 text-gray-200",
  twitter: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  youtube: "border-red-500/30 bg-red-500/5 text-red-500",
  facebook: "border-blue-600/30 bg-blue-600/5 text-blue-600",
  linkedin: "border-blue-700/30 bg-blue-700/5 text-blue-700",
  pinterest: "border-red-600/30 bg-red-600/5 text-red-600",
  threads: "border-gray-600/30 bg-gray-600/5 text-gray-300",
  whatsapp: "border-green-500/30 bg-green-500/5 text-green-500",
  reddit: "border-orange-500/30 bg-orange-500/5 text-orange-500",
  bluesky: "border-blue-400/30 bg-blue-400/5 text-blue-400",
  google: "border-blue-500/30 bg-blue-500/5 text-blue-500",
  telegram: "border-sky-500/30 bg-sky-500/5 text-sky-500",
  snapchat: "border-yellow-400/30 bg-yellow-400/5 text-yellow-400",
};

export const statusStyles: Record<string, string> = {
  published: "bg-success/10 text-success",
  scheduled: "bg-primary/10 text-primary",
  draft: "bg-muted text-muted-foreground",
};

export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
