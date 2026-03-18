"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { brandPerformance } from "@/data/mock";
import { SankeyChart, SankeyNode, SankeyLink } from "@/components/charts/sankey";
import { RadarChart } from "@/components/charts/radar-chart";
import { RadarArea } from "@/components/charts/radar-area";
import { RadarGrid } from "@/components/charts/radar-grid";
import { RadarAxis } from "@/components/charts/radar-axis";
import { RadarLabels } from "@/components/charts/radar-labels";
import { RingChart } from "@/components/charts/ring-chart";
import { Ring } from "@/components/charts/ring";
import { RingCenter } from "@/components/charts/ring-center";
import { FunnelChart } from "@/components/charts/funnel-chart";

export default function BrandStatsPage() {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const ringData = [
    { label: "YouTube", value: 85, maxValue: 100, color: "#FF0000" },
    { label: "Instagram", value: 72, maxValue: 100, color: "#E4405F" },
    { label: "TikTok", value: 94, maxValue: 100, color: "#000000" },
    { label: "LinkedIn", value: 58, maxValue: 100, color: "#0A66C2" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

      {/* Overall Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Followers</p>
            <p className="text-xl font-semibold">{formatNumber(brandPerformance.totalFollowers)}</p>
            <Badge variant="secondary" className="mt-1.5 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              {brandPerformance.followersGrowth}%
            </Badge>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Impressions</p>
            <p className="text-xl font-semibold">{formatNumber(brandPerformance.totalImpressions)}</p>
            <Badge variant="secondary" className="mt-1.5 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              {brandPerformance.impressionsGrowth}%
            </Badge>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg. Engagement</p>
            <p className="text-xl font-semibold">{brandPerformance.avgEngagementRate}%</p>
            <Badge variant="secondary" className="mt-1.5 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              {brandPerformance.engagementGrowth}%
            </Badge>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Viral Posts</p>
            <p className="text-xl font-semibold">{brandPerformance.viralPosts}</p>
            <Badge variant="secondary" className="mt-1.5 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              {brandPerformance.viralPostsGrowth}
            </Badge>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Avg. Likes/Post</p>
            <p className="text-xl font-semibold">{formatNumber(brandPerformance.avgLikesPerPost)}</p>
            <Badge variant="secondary" className="mt-1.5 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              +{brandPerformance.avgLikesGrowth}%
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Content Funnel */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base font-semibold">
              Content Funnel
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              How users engage with your content
            </p>
          </CardHeader>
          <CardContent>
            <FunnelChart
              data={[
                { label: "Impressions", value: 2400000 },
                { label: "Reach", value: 1200000 },
                { label: "Engagements", value: 156000 },
                { label: "Clicks", value: 45000 },
                { label: "Conversions", value: 3200 },
              ]}
              orientation="horizontal"
              color="hsl(var(--primary))"
              showValues={true}
              showPercentage={true}
              showLabels={true}
            />
          </CardContent>
        </Card>

        {/* Platform Engagement Ring */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base font-semibold">
              Platform Goals
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Monthly follower growth targets
            </p>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-6">
            <RingChart
              data={ringData}
              size={180}
              hoveredIndex={hoveredIndex}
              onHoverChange={setHoveredIndex}
            >
              {ringData.map((_, i) => <Ring index={i} key={i} />)}
              <RingCenter defaultLabel="Progress" suffix="%" />
            </RingChart>

            {/* Legend */}
            <div className="flex flex-col gap-2">
              {ringData.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-muted/50"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">{item.value}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(item.value / item.maxValue) * 100}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance Radar */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base font-semibold">
            Platform Performance Comparison
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Compare metrics across all platforms
          </p>
        </CardHeader>
        <CardContent>
          <RadarChart
            data={[
              {
                label: "Engagement",
                values: { engagement: 92, reach: 85, clicks: 78, saves: 95, shares: 88 },
                color: "#10b981",
              },
              {
                label: "Growth",
                values: { engagement: 78, reach: 90, clicks: 82, saves: 75, shares: 85 },
                color: "#6366f1",
              },
              {
                label: "Virality",
                values: { engagement: 65, reach: 72, clicks: 68, saves: 88, shares: 94 },
                color: "#f59e0b",
              },
            ]}
            metrics={[
              { key: "engagement", label: "Engagement" },
              { key: "reach", label: "Reach" },
              { key: "clicks", label: "Clicks" },
              { key: "saves", label: "Saves" },
              { key: "shares", label: "Shares" },
            ]}
            size={300}
          >
            <RadarGrid />
            <RadarAxis />
            <RadarLabels />
            <RadarArea index={0} />
            <RadarArea index={1} />
            <RadarArea index={2} />
          </RadarChart>
        </CardContent>
      </Card>

      {/* Traffic Flow Sankey */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base font-semibold">
            Traffic Flow
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            How users discover your content across platforms
          </p>
        </CardHeader>
        <CardContent>
          <SankeyChart
            data={{
              nodes: [
                { name: "YouTube", color: "#FF0000" },
                { name: "Instagram", color: "#E4405F" },
                { name: "TikTok", color: "#000000" },
                { name: "Website", color: "#6366f1" },
                { name: "Sign Up", color: "#10b981" },
                { name: "Purchase", color: "#f59e0b" },
              ],
              links: [
                { source: 0, target: 3, value: 45000 },
                { source: 1, target: 3, value: 67000 },
                { source: 2, target: 3, value: 89000 },
                { source: 3, target: 4, value: 120000 },
                { source: 4, target: 5, value: 32000 },
              ],
            }}
          >
            <SankeyLink />
            <SankeyNode />
          </SankeyChart>
        </CardContent>
      </Card>
    </div>
  );
}
