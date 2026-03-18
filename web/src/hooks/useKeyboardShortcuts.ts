"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export interface ShortcutConfig {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
  description: string;
}

const pageRoutes = ["/post", "/inbox", "/analytics", "/ai", "/settings"] as const;
const pageNames: Record<string, string> = {
  "/post": "Calendar",
  "/inbox": "Inbox",
  "/analytics": "Analytics",
  "/ai": "AI Creator",
  "/settings": "Settings",
};

/**
 * Custom hook for handling keyboard shortcuts for page navigation.
 *
 * Shortcuts:
 * - Cmd/Ctrl + 1-5: Navigate to specific pages
 * - Cmd/Ctrl + [: Navigate to previous page
 * - Cmd/Ctrl + ]: Navigate to next page
 * - Alt + Left/Right: Alternative sequential navigation
 */
export function useKeyboardShortcuts(onNavigate?: (pageName: string) => void) {
  const router = useRouter();

  const navigateToPage = useCallback(
    (index: number) => {
      if (index >= 0 && index < pageRoutes.length) {
        const route = pageRoutes[index];
        router.push(route);
        onNavigate?.(pageNames[route]);
      }
    },
    [router, onNavigate]
  );

  const navigateToNext = useCallback(
    (currentPathname: string) => {
      const currentIndex = pageRoutes.indexOf(currentPathname as any);
      if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % pageRoutes.length;
        navigateToPage(nextIndex);
      }
    },
    [navigateToPage]
  );

  const navigateToPrevious = useCallback(
    (currentPathname: string) => {
      const currentIndex = pageRoutes.indexOf(currentPathname as any);
      if (currentIndex !== -1) {
        const prevIndex = currentIndex === 0 ? pageRoutes.length - 1 : currentIndex - 1;
        navigateToPage(prevIndex);
      }
    },
    [navigateToPage]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? event.metaKey : event.ctrlKey;

      // Number shortcuts: Cmd/Ctrl + 1-5
      if (cmdOrCtrl && !event.altKey && !event.shiftKey) {
        const num = parseInt(event.key, 10);
        if (num >= 1 && num <= 5) {
          event.preventDefault();
          navigateToPage(num - 1);
          return;
        }
      }

      // Bracket shortcuts: Cmd/Ctrl + [ / ]
      if (cmdOrCtrl && !event.altKey && !event.shiftKey) {
        if (event.key === "[") {
          event.preventDefault();
          navigateToPrevious(window.location.pathname);
          return;
        }
        if (event.key === "]") {
          event.preventDefault();
          navigateToNext(window.location.pathname);
          return;
        }
      }

      // Alt + Arrow shortcuts for sequential navigation
      if (event.altKey && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          navigateToPrevious(window.location.pathname);
          return;
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          navigateToNext(window.location.pathname);
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateToNext, navigateToPrevious, navigateToPage]);

  return {
    shortcuts: [
      { key: "⌘1 / Ctrl+1", description: "Go to Calendar" },
      { key: "⌘2 / Ctrl+2", description: "Go to Inbox" },
      { key: "⌘3 / Ctrl+3", description: "Go to Analytics" },
      { key: "⌘4 / Ctrl+4", description: "Go to AI Creator" },
      { key: "⌘5 / Ctrl+5", description: "Go to Settings" },
      { key: "⌘[ / Ctrl+[", description: "Previous page" },
      { key: "⌘] / Ctrl+]", description: "Next page" },
    ],
  };
}
