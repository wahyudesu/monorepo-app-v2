"use client";

import { AppHeader } from "./AppHeader";
import { ExpandableNav } from "./ExpandableNav";
import { useAuth } from "@clerk/nextjs";
import { AuthGateProvider } from "@/components/auth";

interface AppLayoutWrapperProps {
  children: React.ReactNode;
}

export function AppLayoutWrapper({ children }: AppLayoutWrapperProps) {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <AuthGateProvider isSignedIn={isSignedIn ?? false}>
      <div className="flex min-h-screen flex-col bg-background">
        <AppHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 overflow-auto px-5 pb-24 pt-4">
          {children}
        </main>
        <ExpandableNav />
      </div>
    </AuthGateProvider>
  );
}
