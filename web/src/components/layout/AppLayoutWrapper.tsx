"use client";

import { AppHeader } from "./AppHeader";
import { ExpandableNav } from "./ExpandableNav";

interface AppLayoutWrapperProps {
  children: React.ReactNode;
}

export function AppLayoutWrapper({ children }: AppLayoutWrapperProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <main className="mx-auto w-full max-w-[1024px] flex-1 overflow-auto px-5 pb-24 pt-4">
        {children}
      </main>
      <ExpandableNav />
    </div>
  );
}
