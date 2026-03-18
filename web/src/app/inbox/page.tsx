import { Suspense } from "react";
import { InboxContent } from "./InboxContent";
import { InboxSkeleton } from "@/components/ui";

export default function InboxPage() {
  return (
    <Suspense fallback={<InboxSkeleton />}>
      <InboxContent />
    </Suspense>
  );
}
