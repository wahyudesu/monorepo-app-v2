"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
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
            <Link href="/analytics">
              <Button variant="ghost" size="sm" className="gap-1.5">
                Back
              </Button>
            </Link>
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

      {/* Tab Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "audience" && <AudienceTab />}
          {activeTab === "content" && <ContentTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
