"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { BrandStatsTabs } from "./components/BrandStatsTabs";
import { AudienceTab } from "./components/AudienceTab";
import { ContentTab } from "./components/ContentTab";
import { FunnelTab } from "./components/FunnelTab";

export default function BrandStatsPage() {
  const [activeTab, setActiveTab] = useState("audience");

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
          {activeTab === "audience" && <AudienceTab />}
          {activeTab === "content" && <ContentTab />}
          {activeTab === "funnel" && <FunnelTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
