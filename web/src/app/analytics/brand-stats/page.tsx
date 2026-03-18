"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrandStatsTabs } from "./components/BrandStatsTabs";
import { SummaryCards } from "./components/SummaryCards";
import { OverviewTab } from "./components/OverviewTab";
import { AudienceTab } from "./components/AudienceTab";
import { ContentTab } from "./components/ContentTab";

export default function BrandStatsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <Link href="/analytics">
                Back
              </Link>
            </Button>
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Brand Statistics
          </h1>
          <p className="text-sm text-muted-foreground">
            Detailed performance metrics for your social media presence
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Tabs */}
      <BrandStatsTabs value={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "audience" && <AudienceTab />}
      {activeTab === "content" && <ContentTab />}
    </div>
  );
}
