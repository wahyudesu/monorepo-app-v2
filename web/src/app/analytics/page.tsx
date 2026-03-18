"use client";

import { useState, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  analyticsData7d,
  analyticsData30d,
  analyticsData90d,
  analyticsPlatforms,
  brandPerformance,
  publishedPosts,
} from "@/data/mock";
import { cn } from "@/lib/utils";
import { ChartSkeleton } from "@/components/loading";

import { SummaryCard } from "./components/SummaryCard";

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

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");

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
      <div className="grid grid-cols-5 gap-4 overflow-x-auto pb-2">
        <SummaryCard
          title="Total Followers"
          value={brandPerformance.totalFollowers.toLocaleString()}
          trend={{
            value: brandPerformance.followersGrowth + "%",
            direction: "up",
          }}
        />
        <SummaryCard
          title="Total Impressions"
          value={brandPerformance.totalImpressions.toLocaleString()}
          trend={{
            value: brandPerformance.impressionsGrowth + "%",
            direction: "up",
          }}
        />
        <SummaryCard
          title="Engagement Rate"
          value={brandPerformance.avgEngagementRate + "%"}
          trend={{
            value: brandPerformance.engagementGrowth + "%",
            direction: "up",
          }}
        />
        <SummaryCard
          title="Viral Posts"
          value={brandPerformance.viralPosts}
          trend={{ value: brandPerformance.viralPostsGrowth, direction: "up" }}
        />
        <SummaryCard
          title="Avg. Likes/Post"
          value={brandPerformance.avgLikesPerPost.toLocaleString()}
          trend={{
            value: brandPerformance.avgLikesGrowth + "%",
            direction: "up",
          }}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50 p-1 rounded-lg">
            <TabsTrigger
              value="overview"
              className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="platforms"
              className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Details
            </TabsTrigger>
          </TabsList>

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

        <TabsContent value="overview">
          <Suspense fallback={<ChartSkeleton />}>
            <OverviewTab data={data} platforms={analyticsPlatforms} />
          </Suspense>
        </TabsContent>

        <TabsContent value="platforms">
          <Suspense
            fallback={
              <div className="h-64 animate-pulse bg-muted/20 rounded-lg" />
            }
          >
            <PlatformsTab />
          </Suspense>
        </TabsContent>
      </Tabs>

      {/* Published Posts Section */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-base font-semibold">
              Published Posts
            </CardTitle>
            <Badge variant="outline" className="text-xs">
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
