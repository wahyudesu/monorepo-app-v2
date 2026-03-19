import { SocialIcon } from "react-social-icons";

export type Platform =
  | "instagram"
  | "tiktok"
  | "twitter"
  | "youtube"
  | "facebook"
  | "linkedin"
  | "pinterest"
  | "threads"
  | "whatsapp"
  | "reddit"
  | "bluesky"
  | "google"
  | "telegram"
  | "snapchat";

// Mapping for platforms not directly supported by react-social-icons
const networkMapping: Record<Platform, string> = {
  instagram: "instagram",
  tiktok: "tiktok",
  twitter: "x", // Twitter is now X
  youtube: "youtube",
  facebook: "facebook",
  linkedin: "linkedin",
  pinterest: "pinterest",
  threads: "threads",
  whatsapp: "whatsapp",
  reddit: "reddit",
  bluesky: "bsky.app", // Bluesky uses bsky.app network
  google: "google",
  telegram: "telegram",
  snapchat: "snapchat",
};

interface PlatformIconProps {
  platform: Platform;
  size?: number;
  className?: string;
}

export function PlatformIcon({
  platform,
  size = 20,
  className,
}: PlatformIconProps) {
  const network = networkMapping[platform];

  return (
    <SocialIcon
      network={network}
      as="span"
      style={{ height: size, width: size }}
      className={className}
    />
  );
}

export function getPlatformColor(platform: Platform): string {
  const colors: Record<Platform, string> = {
    instagram: "#E4405F", // Pink/Red
    tiktok: "#00F2EA", // Cyan
    twitter: "#657786", // Gray Blue
    youtube: "#FF0000", // Red
    facebook: "#1877F2", // Blue
    linkedin: "#0077B5", // Dark Blue
    pinterest: "#E60023", // Red-Pink
    threads: "#A0A0A0", // Gray
    whatsapp: "#25D366", // Green
    reddit: "#FF4500", // Orange
    bluesky: "#0085FF", // Light Blue
    google: "#EA4335", // Red-ish (Google's red)
    telegram: "#229ED9", // Sky Blue
    snapchat: "#FFFC00", // Yellow
  };
  return colors[platform] || "#666";
}

export function getPlatformBgColor(platform: Platform): string {
  return `${getPlatformColor(platform)}15`; // 15 = ~9% opacity
}
