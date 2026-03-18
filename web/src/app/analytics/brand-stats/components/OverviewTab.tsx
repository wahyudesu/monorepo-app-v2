"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RingChart } from "@/components/charts/ring-chart";
import { Ring } from "@/components/charts/ring";
import { RingCenter } from "@/components/charts/ring-center";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { BarYAxis } from "@/components/charts/bar-y-axis";
import { ChartTooltip } from "@/components/charts/tooltip/chart-tooltip";
import { engagementTrend7d, engagementTrend30d, engagementTrend90d } from "@/data/mock";
import type { EngagementTrend } from "@/data/mock";

interface PlatformDataPoint {
  name: string;
  followers: number;
  color: string;
}

export function OverviewTab() {
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("30d");

  const engagementData: Record<string, EngagementTrend[]> = {
    "7d": engagementTrend7d,
    "30d": engagementTrend30d,
    "90d": engagementTrend90d,
  };

  const currentData = engagementData[dateRange] as unknown as Record<string, unknown>[];

  const ringData = [
    { label: "YouTube", value: 85, maxValue: 100, color: "#FF0000" },
    { label: "Instagram", value: 72, maxValue: 100, color: "#E4405F" },
    { label: "TikTok", value: 94, maxValue: 100, color: "#000000" },
    { label: "LinkedIn", value: 58, maxValue: 100, color: "#0A66C2" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Platform data for bar chart
  const platformData: PlatformDataPoint[] = [
    { name: "TikTok", followers: 125800, color: "#000000" },
    { name: "YouTube", followers: 72100, color: "#FF0000" },
    { name: "Instagram", followers: 48200, color: "#E4405F" },
    { name: "Twitter", followers: 31400, color: "#1DA1F2" },
  ];

  return (
    <div className="space-y-6">
      {/* Platform Goals Ring Chart */}
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

      {/* Engagement Trend */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-display text-base font-semibold">
              Engagement Trend
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Daily engagement over time
            </p>
          </div>
          <div className="flex gap-1">
            {(["7d", "30d", "90d"] as const).map((range) => (
              <Button
                key={range}
                variant={dateRange === range ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setDateRange(range)}
                className="h-7 text-xs"
              >
                {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <BarChart
            data={currentData}
            xDataKey="displayDate"
            margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
            barGap={0.3}
          >
            <BarXAxis />
            <BarYAxis />
            <Bar dataKey="total" fill="hsl(var(--primary))" lineCap={4} />
            <ChartTooltip
              content={(data): ReactNode => {
                const point = data.point as unknown as EngagementTrend;
                return (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{point.displayDate}</p>
                    <p className="text-xs text-muted-foreground">Total: {point.total.toLocaleString()}</p>
                    <p className="text-xs">Likes: {point.likes.toLocaleString()}</p>
                    <p className="text-xs">Comments: {point.comments.toLocaleString()}</p>
                    <p className="text-xs">Shares: {point.shares.toLocaleString()}</p>
                  </div>
                );
              }}
            />
          </BarChart>
        </CardContent>
      </Card>

      {/* Platform Comparison */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base font-semibold">
            Platform Comparison
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Total followers per platform
          </p>
        </CardHeader>
        <CardContent>
          <BarChart
            data={platformData}
            xDataKey="name"
            orientation="horizontal"
            margin={{ top: 10, right: 30, bottom: 30, left: 80 }}
            barGap={0.2}
            barWidth={32}
          >
            <BarXAxis />
            <BarYAxis />
            <Bar dataKey="followers" fill="hsl(var(--primary))" lineCap={4} />
            <ChartTooltip
              content={(data): ReactNode => {
                const point = data.point as unknown as PlatformDataPoint;
                return (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{point.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {point.followers.toLocaleString()} followers
                    </p>
                  </div>
                );
              }}
            />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
}
