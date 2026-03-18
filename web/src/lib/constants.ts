import { type Platform } from "@/data/mock";

export const platformIcons: Record<Platform, string> = {
  instagram: "📸",
  tiktok: "🎵",
  twitter: "𝕏",
  youtube: "▶️",
};

export const platformColors: Record<Platform, string> = {
  instagram: "border-pink-500/30 bg-pink-500/5 text-pink-500",
  tiktok: "border-gray-500/30 bg-gray-500/5 text-gray-200",
  twitter: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  youtube: "border-red-500/30 bg-red-500/5 text-red-500",
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
