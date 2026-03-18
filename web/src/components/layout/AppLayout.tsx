import { ExpandableNav } from "./ExpandableNav";
import { AppHeader } from "./AppHeader";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
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
