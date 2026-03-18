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
    instagram: "#E4405F",
    tiktok: "#000000",
    twitter: "#000000",
    youtube: "#FF0000",
    facebook: "#1877F2",
    linkedin: "#0077B5",
    pinterest: "#E60023",
    threads: "#000000",
    whatsapp: "#25D366",
    reddit: "#FF4500",
    bluesky: "#0085FF",
    google: "#4285F4",
    telegram: "#0088CC",
    snapchat: "#FFFC00",
  };
  return colors[platform] || "#666";
}

export function getPlatformBgColor(platform: Platform): string {
  return `${getPlatformColor(platform)}15`; // 15 = ~9% opacity
}
