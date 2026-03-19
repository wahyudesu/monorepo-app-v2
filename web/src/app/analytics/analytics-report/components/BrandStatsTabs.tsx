"use client";

import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "audience", label: "Audience" },
  { id: "content", label: "Content" },
  { id: "funnel", label: "Funnel" },
];

interface BrandStatsTabsProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function BrandStatsTabs({ value, onChange, className }: BrandStatsTabsProps) {
  return (
    <AnimatedTabs
      tabs={TABS}
      activeTab={value}
      onChange={onChange}
      variant="pill"
      className={className}
    />
  );
}
