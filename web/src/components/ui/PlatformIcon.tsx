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
  // Warna dibuat sangat berbeda untuk memudahkan distinguo visual
  const colors: Record<Platform, string> = {
    instagram: "#E1306C", // Magenta Pink
    tiktok: "#00C7B7", // Teal
    twitter: "#1DA1F2", // Sky Blue
    youtube: "#FF0000", // Pure Red
    facebook: "#1877F2", // Blue
    linkedin: "#0A66C2", // Navy Blue
    pinterest: "#E60023", // Dark Red
    threads: "#000000", // Black
    whatsapp: "#25D366", // Green
    reddit: "#FF4500", // Orange
    bluesky: "#0085FF", // Light Blue
    google: "#FBBC05", // Yellow
    telegram: "#0088CC", // Telegram Blue
    snapchat: "#FFFC00", // Yellow
  };
  return colors[platform] || "#666";
}

export function getPlatformBgColor(platform: Platform): string {
  return `${getPlatformColor(platform)}15`; // 15 = ~9% opacity
}
