"use client";

import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";
import { useCallback, useId, useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface BrandStatsTabsProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SPRING = {
  type: "spring" as const,
  duration: 0.25,
  bounce: 0.05,
};

const TABS: Tab[] = [
  { id: "overview", label: "Overview" },
  { id: "audience", label: "Audience" },
  { id: "content", label: "Content" },
];

export function BrandStatsTabs({ value, onChange, className }: BrandStatsTabsProps) {
  const shouldReduceMotion = useReducedMotion();
  const generatedId = useId();
  const layoutId = `brand-stats-tabs-${generatedId}`;

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, currentIndex: number) => {
      let newIndex = currentIndex;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        newIndex = (currentIndex + 1) % TABS.length;
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        newIndex = (currentIndex - 1 + TABS.length) % TABS.length;
      } else if (event.key === "Home") {
        event.preventDefault();
        newIndex = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        newIndex = TABS.length - 1;
      } else {
        return;
      }

      const newTab = TABS[newIndex];
      if (newTab) {
        onChange(newTab.id);
        const tabElement = document.getElementById(`${layoutId}-tab-${newTab.id}`);
        tabElement?.focus();
      }
    },
    [onChange, layoutId]
  );

  return (
    <div
      aria-label="Tabs"
      className={cn("relative inline-flex", className)}
      role="tablist"
    >
      {/* Pill/Segment background container */}
      <div className="inline-flex items-center gap-1 rounded-xl bg-muted p-1">
        {TABS.map((tab, index) => {
          const isActive = value === tab.id;

          return (
            <button
              aria-selected={isActive}
              className={cn(
                "relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              id={`${layoutId}-tab-${tab.id}`}
              key={tab.id}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-lg border border-border bg-background shadow-sm"
                  layout
                  layoutId={layoutId}
                  transition={shouldReduceMotion ? { duration: 0 } : SPRING}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
