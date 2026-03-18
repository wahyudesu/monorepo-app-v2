"use client";

import { CalendarDays, BarChart3, Settings, MessageSquare, Sparkles, Wrench } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { ExpandableTabs, type TabItem } from "@/components/ui/expandable-tabs";

const navItems = [
  { to: "/post", icon: CalendarDays, label: "Post", shortcut: "1" },
  { to: "/inbox", icon: MessageSquare, label: "Inbox", shortcut: "2" },
  { to: "/analytics", icon: BarChart3, label: "Analytics", shortcut: "3" },
  { to: "/ai", icon: Sparkles, label: "AI", shortcut: "4" },
  { to: "/tools", icon: Wrench, label: "Tools", shortcut: "5" },
  { to: "/settings", icon: Settings, label: "Settings", shortcut: "6" },
] as const;

export function ExpandableNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Calculate the current active index based on pathname
  const activeIndex = navItems.findIndex((item) => item.to === pathname);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isMac = typeof navigator !== "undefined"
      ? navigator.platform.toUpperCase().indexOf("MAC") >= 0
      : false;
    const modifierKey = isMac ? "metaKey" : "ctrlKey";

    if (e[modifierKey] && e.key >= "1" && e.key <= "6") {
      e.preventDefault();
      const index = parseInt(e.key) - 1;
      if (navItems[index]) {
        router.push(navItems[index].to);
      }
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Convert navItems to TabItem format
  const tabs: TabItem[] = navItems.map((item) => ({
    title: item.label,
    icon: item.icon,
    type: "tab" as const,
  }));

  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      const targetPath = navItems[index].to;
      // Only navigate if clicking a different tab
      if (pathname !== targetPath) {
        router.push(targetPath);
      }
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
      <ExpandableTabs
        tabs={tabs}
        activeIndex={activeIndex !== -1 ? activeIndex : undefined}
        className="bg-foreground/95 backdrop-blur-xl border-foreground/20"
        onChange={handleTabChange}
      />
    </div>
  );
}
