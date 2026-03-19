"use client";

import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";
import { type ReactNode, useCallback, useId } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface AnimatedTabsProps {
  tabs: { id: string; label: string; icon?: ReactNode }[];
  activeTab?: string;
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: "underline" | "pill" | "segment";
  layoutId?: string;
  className?: string;
  iconOnly?: boolean;
}

const SPRING = {
  type: "spring" as const,
  duration: 0.25,
  bounce: 0.05,
};

export function AnimatedTabs({
  tabs,
  activeTab: controlledActiveTab,
  defaultTab,
  onChange,
  variant = "pill",
  layoutId: customLayoutId,
  className,
  iconOnly = false,
}: AnimatedTabsProps) {
  const shouldReduceMotion = useReducedMotion();
  const generatedId = useId();
  const layoutId = customLayoutId ?? `animated-tabs-${generatedId}`;

  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : defaultTab ?? tabs[0]?.id ?? "";

  const handleTabChange = useCallback(
    (tabId: string) => {
      onChange?.(tabId);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, currentIndex: number) => {
      let newIndex = currentIndex;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        event.preventDefault();
        newIndex = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        newIndex = tabs.length - 1;
      } else {
        return;
      }

      const newTab = tabs[newIndex];
      if (newTab) {
        handleTabChange(newTab.id);
        const tabElement = document.getElementById(`${layoutId}-tab-${newTab.id}`);
        tabElement?.focus();
      }
    },
    [tabs, handleTabChange, layoutId]
  );

    const baseContainerStyles = cn(
      "relative inline-flex",
      variant === "underline" && "gap-1 border-b border-border",
    variant === "pill" && "",
    variant === "segment" && ""
  );

        const getTabStyles = (isActive: boolean) =>
              cn(
                "relative z-10 flex items-center justify-center font-medium transition-colors",
                variant === "underline"
                  ? "text-base gap-2 px-4 py-3"
                  : iconOnly ? "text-sm px-2.5 py-2" : "text-sm gap-2 px-3 py-2",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            variant === "underline" && [
              "rounded-t-lg border-b-2 mb-[-1px]",
              isActive
                ? "text-foreground border-foreground"
                : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/50",
            ],
          variant === "pill" && [
            "rounded-md",
            isActive
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          ],
          variant === "segment" && [
            "flex-1 rounded-md",
            isActive
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          ]
        );

        const getIndicatorStyles = () =>
          cn(
            "absolute",
            variant === "underline" && "hidden",
        variant === "pill" &&
          "inset-0 rounded-md border border-border bg-background shadow-sm",
        variant === "segment" &&
          "inset-0 rounded-md border border-border bg-background shadow-sm"
      );

    if (variant === "pill" || variant === "segment") {
      return (
        <div
          aria-label="Tabs"
          className={cn(baseContainerStyles, className)}
          role="tablist"
        >
              <div className={cn(
                "inline-flex items-center rounded-lg bg-muted p-1",
                variant === "segment" && "rounded-md"
              )}>
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;

              const tabButton = (
                <button
                  aria-selected={isActive}
                  className={getTabStyles(isActive)}
                  id={`${layoutId}-tab-${tab.id}`}
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                >
                  {isActive && (
                    <motion.span
                      className={getIndicatorStyles()}
                      layout
                      layoutId={layoutId}
                      transition={shouldReduceMotion ? { duration: 0 } : SPRING}
                    />
                  )}
                    {tab.icon && <span className="relative z-10">{tab.icon}</span>}
                    {!iconOnly && <span className="relative z-10">{tab.label}</span>}
                  </button>
                );

                if (iconOnly) {
                  return (
                    <Tooltip key={tab.id}>
                      <TooltipTrigger>{tabButton}</TooltipTrigger>
                      <TooltipContent side="bottom">
                        {tab.label}
                      </TooltipContent>
                    </Tooltip>
                  );
                }

                return tabButton;
              })}
            </div>
          </div>
        );
      }
  
      // underline variant
      return (
        <div
          aria-label="Tabs"
          className={cn(baseContainerStyles, className)}
          role="tablist"
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;

            const tabButton = (
              <button
                aria-selected={isActive}
                className={getTabStyles(isActive)}
                id={`${layoutId}-tab-${tab.id}`}
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                type="button"
              >
                {isActive && (
                  <motion.span
                    className={getIndicatorStyles()}
                    layout
                    layoutId={layoutId}
                    transition={shouldReduceMotion ? { duration: 0 } : SPRING}
                  />
                )}
                {tab.icon && <span className="relative z-10">{tab.icon}</span>}
                {!iconOnly && <span className="relative z-10">{tab.label}</span>}
              </button>
            );

            if (iconOnly) {
              return (
                <Tooltip key={tab.id}>
                  <TooltipTrigger>{tabButton}</TooltipTrigger>
                  <TooltipContent side="bottom">
                    {tab.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return tabButton;
          })}
        </div>
      );
  }
