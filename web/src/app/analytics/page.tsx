"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedTabs, Skeleton } from "@/components/ui";
import { AnimatePresence, motion } from "motion/react";
import {
    analyticsData7d,
    analyticsData30d,
    analyticsData90d,
    analyticsPlatforms,
    publishedPosts,
    analyticsStats7d,
    analyticsStats30d,
    analyticsStats90d,
    followersData7d,
    followersData30d,
    followersData90d,
    type AnalyticsStats,
  } from "@/data/mock";
import { cn } from "@/lib/utils";
import { ChartSkeleton } from "@/components/ui";

import { SummaryCard } from "./components/SummaryCard";

// Stats Skeleton Component
function StatsSkeleton() {
  return (
    <div className="flex overflow-x-auto pb-2">
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className={cn(
            "flex-1 min-w-[100px] space-y-2",
            index === 0 && "pr-4 border-r border-border",
            index > 0 && index < 4 && "px-4 border-r border-border",
            index === 4 && "pl-4"
          )}
        >
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      ))}
    </div>
  );
}

// Lazy load heavy tab components
const OverviewTab = dynamic(
  () =>
    import("./components/OverviewTab").then((mod) => ({
      default: mod.OverviewTab,
    })),
  {
    loading: () => <ChartSkeleton />,
    ssr: true,
  },
);

const PlatformsTab = dynamic(
  () =>
    import("./components/PlatformsTab").then((mod) => ({
      default: mod.PlatformsTab,
    })),
  {
    loading: () => (
      <div className="h-64 animate-pulse bg-muted/20 rounded-lg" />
    ),
    ssr: true,
  },
);

const PublishedPostsTab = dynamic(
  () =>
    import("./components/PublishedPostsTab").then((mod) => ({
      default: mod.PublishedPostsTab,
    })),
  {
    loading: () => (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 w-40 bg-muted rounded" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-muted/20 rounded-lg" />
          ))}
        </div>
      </div>
    ),
    ssr: true,
  },
);

type TimeRange = "7d" | "30d" | "90d";

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toLocaleString();
}

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState<TimeRange>("30d");
    const [activeTab, setActiveTab] = useState("overview");
    const [isLoading, setIsLoading] = useState(true);

    // Simulate initial loading and when timeRange changes
    useEffect(() => {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }, [timeRange]);

    const data = useMemo(() => {
      switch (timeRange) {
        case "7d":
          return analyticsData7d;
        case "30d":
          return analyticsData30d;
        case "90d":
          return analyticsData90d;
      }
    }, [timeRange]);

  const stats: AnalyticsStats = useMemo(() => {
        switch (timeRange) {
          case "7d":
            return analyticsStats7d;
          case "30d":
            return analyticsStats30d;
          case "90d":
            return analyticsStats90d;
        }
      }, [timeRange]);

      const followersData = useMemo(() => {
        switch (timeRange) {
          case "7d":
            return followersData7d;
          case "30d":
            return followersData30d;
          case "90d":
            return followersData90d;
        }
      }, [timeRange]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Social Media Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Track your posting performance across all platforms
        </p>
      </div>

          {/* Summary Cards */}
          {isLoading ? (
            <StatsSkeleton />
          ) : (
          <div className="flex overflow-x-auto pb-2">
            <div className="flex-1 min-w-[100px] pr-4 border-r border-border">
              <SummaryCard
                title="Impressions"
                value={formatNumber(stats.impressions.value)}
                trend={{
                  value: stats.impressions.trend,
                  direction: "up",
                }}
              />
            </div>
            <div className="flex-1 min-w-[100px] px-4 border-r border-border">
              <SummaryCard
                title="Engagements"
                value={formatNumber(stats.engagements.value)}
                trend={{
                  value: stats.engagements.trend,
                  direction: "up",
                }}
              />
            </div>
            <div className="flex-1 min-w-[100px] px-4 border-r border-border">
              <SummaryCard
                title="Likes"
                value={formatNumber(stats.likes.value)}
                trend={{
                  value: stats.likes.trend,
                  direction: "up",
                }}
              />
            </div>
            <div className="flex-1 min-w-[100px] px-4 border-r border-border">
              <SummaryCard
                title="Profile Visits"
                value={formatNumber(stats.profileVisits.value)}
                trend={{ value: stats.profileVisits.trend, direction: "up" }}
              />
            </div>
            <div className="flex-1 min-w-[100px] pl-4">
              <SummaryCard
                title="Replies"
                value={formatNumber(stats.replies.value)}
                trend={{
                  value: stats.replies.trend,
                  direction: "up",
                }}
              />
            </div>
          </div>
          )}

      {/* Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <AnimatedTabs
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: "overview", label: "Overview" },
              { id: "platforms", label: "Details" },
            ]}
            variant="pill"
          />

          {/* Time Range Filter */}
          <div className="inline-flex items-center rounded-lg bg-muted/50 p-1">
            {[
              { value: "7d" as const, label: "7D" },
              { value: "30d" as const, label: "30D" },
              { value: "90d" as const, label: "90D" },
            ].map((range) => (
              <Button
                key={range.value}
                variant="ghost"
                size="sm"
                onClick={() => setTimeRange(range.value)}
                className={cn(
                  "h-7 rounded-md px-3 text-xs font-medium transition-all",
                  timeRange === range.value
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Animated Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && (
              <Suspense fallback={<ChartSkeleton />}>
                <OverviewTab data={data} platforms={analyticsPlatforms} followersData={followersData} />
              </Suspense>
            )}

            {activeTab === "platforms" && (
              <Suspense fallback={<div className="h-64 animate-pulse bg-muted/20 rounded-lg" />}>
                <PlatformsTab />
              </Suspense>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Published Posts Section */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-base font-semibold">
              Published Posts
            </CardTitle>
            <Badge variant="destructive" className="text-xs">
              {publishedPosts.length} posts
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="space-y-4 animate-pulse">
                <div className="h-6 w-40 bg-muted rounded" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-48 bg-muted/20 rounded-lg" />
                  ))}
                </div>
              </div>
            }
          >
            <PublishedPostsTab />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
