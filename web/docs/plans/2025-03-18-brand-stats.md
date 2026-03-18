# Brand Stats Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-step.

**Goal:** Rebuild the `/analytics/brand-stats` page with a 3-tab layout (Overview, Audience, Content) using existing VisX chart components.

**Architecture:** Single page with Tabs component, each tab contains specific chart components using mock data. Summary cards persist above all tabs. All data sourced from `src/data/mock.ts`.

**Tech Stack:** Next.js 16, React 19, VisX charts, shadcn/ui Tabs, Tailwind CSS v4

---

## Task 1: Add Mock Data to `src/data/mock.ts`

**Files:**
- Modify: `src/data/mock.ts` (append at end)

**Step 1: Add age distribution data**

```typescript
// Age Distribution
export interface AgeDistribution {
  ageGroup: string;
  count: number;
  percentage: number;
}

export const audienceAgeDistribution: AgeDistribution[] = [
  { ageGroup: "13-17", count: 8500, percentage: 3.1 },
  { ageGroup: "18-24", count: 78200, percentage: 28.2 },
  { ageGroup: "25-34", count: 98500, percentage: 35.5 },
  { ageGroup: "35-44", count: 62300, percentage: 22.4 },
  { ageGroup: "45-54", count: 21800, percentage: 7.9 },
  { ageGroup: "55+", count: 8200, percentage: 2.9 },
];
```

**Step 2: Add gender breakdown data**

```typescript
// Gender Breakdown
export interface GenderBreakdown {
  gender: string;
  count: number;
  percentage: number;
}

export const audienceGender: GenderBreakdown[] = [
  { gender: "Male", count: 142300, percentage: 51.3 },
  { gender: "Female", count: 128500, percentage: 46.3 },
  { gender: "Non-binary", count: 6700, percentage: 2.4 },
];
```

**Step 3: Add top countries data**

```typescript
// Top Countries
export interface CountryData {
  country: string;
  code: string;
  followers: number;
  flag: string;
}

export const audienceCountries: CountryData[] = [
  { country: "Indonesia", code: "ID", followers: 98500, flag: "🇮🇩" },
  { country: "United States", code: "US", followers: 67800, flag: "🇺🇸" },
  { country: "Malaysia", code: "MY", followers: 42300, flag: "🇲🇾" },
  { country: "Singapore", code: "SG", followers: 31200, flag: "🇸🇬" },
  { country: "Philippines", code: "PH", followers: 18900, flag: "🇵🇭" },
  { country: "Thailand", code: "TH", followers: 15600, flag: "🇹🇭" },
  { country: "Vietnam", code: "VN", followers: 12300, flag: "🇻🇳" },
  { country: "India", code: "IN", followers: 11200, flag: "🇮🇳" },
  { country: "Brazil", code: "BR", followers: 8900, flag: "🇧🇷" },
  { country: "United Kingdom", code: "UK", followers: 7600, flag: "🇬🇧" },
];
```

**Step 4: Add active hours data**

```typescript
// Active Hours
export interface HourlyEngagement {
  hour: number;
  label: string;
  engagement: number;
}

export const audienceActiveHours: HourlyEngagement[] = [
  { hour: 0, label: "00:00", engagement: 1200 },
  { hour: 1, label: "01:00", engagement: 800 },
  { hour: 2, label: "02:00", engagement: 500 },
  { hour: 3, label: "03:00", engagement: 300 },
  { hour: 4, label: "04:00", engagement: 200 },
  { hour: 5, label: "05:00", engagement: 400 },
  { hour: 6, label: "06:00", engagement: 800 },
  { hour: 7, label: "07:00", engagement: 1500 },
  { hour: 8, label: "08:00", engagement: 3200 },
  { hour: 9, label: "09:00", engagement: 5600 },
  { hour: 10, label: "10:00", engagement: 7200 },
  { hour: 11, label: "11:00", engagement: 6800 },
  { hour: 12, label: "12:00", engagement: 5400 },
  { hour: 13, label: "13:00", engagement: 4800 },
  { hour: 14, label: "14:00", engagement: 6200 },
  { hour: 15, label: "15:00", engagement: 7800 },
  { hour: 16, label: "16:00", engagement: 8500 },
  { hour: 17, label: "17:00", engagement: 9200 },
  { hour: 18, label: "18:00", engagement: 10500 },
  { hour: 19, label: "19:00", engagement: 11200 },
  { hour: 20, label: "20:00", engagement: 9800 },
  { hour: 21, label: "21:00", engagement: 7600 },
  { hour: 22, label: "22:00", engagement: 5200 },
  { hour: 23, label: "23:00", engagement: 2800 },
];
```

**Step 5: Add content type performance data**

```typescript
// Content Type Performance
export interface ContentTypeData {
  type: string;
  posts: number;
  avgEngagement: number;
  totalLikes: number;
  totalShares: number;
}

export const contentTypePerformance: ContentTypeData[] = [
  { type: "Reel", posts: 48, avgEngagement: 8.2, totalLikes: 485000, totalShares: 89500 },
  { type: "Video", posts: 32, avgEngagement: 6.8, totalLikes: 312000, totalShares: 45600 },
  { type: "Carousel", posts: 56, avgEngagement: 4.5, totalLikes: 198000, totalShares: 23400 },
  { type: "Photo", posts: 84, avgEngagement: 3.2, totalLikes: 245000, totalShares: 15600 },
  { type: "Story", posts: 120, avgEngagement: 5.1, totalLikes: 156000, totalShares: 8900 },
];
```

**Step 6: Add engagement trend data**

```typescript
// Engagement Trend
export interface EngagementTrend {
  date: string;
  displayDate: string;
  likes: number;
  comments: number;
  shares: number;
  total: number;
}

function generateEngagementTrend(days: number): EngagementTrend[] {
  const data: EngagementTrend[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const displayDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    const likes = Math.floor(4000 + Math.random() * 3000);
    const comments = Math.floor(likes * 0.03 + Math.random() * 200);
    const shares = Math.floor(likes * 0.05 + Math.random() * 500);

    data.push({
      date: dateStr,
      displayDate,
      likes,
      comments,
      shares,
      total: likes + comments + shares,
    });
  }

  return data;
}

export const engagementTrend7d = generateEngagementTrend(7);
export const engagementTrend30d = generateEngagementTrend(30);
export const engagementTrend90d = generateEngagementTrend(90);
```

**Step 7: Commit mock data**

```bash
git add src/data/mock.ts
git commit -m "feat: add brand stats mock data (age, gender, countries, hours, content types, engagement trend)"
```

---

## Task 2: Create Tab Components Directory

**Files:**
- Create: `src/app/analytics/brand-stats/components/`

**Step 1: Create components directory**

```bash
mkdir -p src/app/analytics/brand-stats/components
```

**Step 2: Commit directory structure**

```bash
git add src/app/analytics/brand-stats/components/
git commit -m "feat: create brand-stats components directory"
```

---

## Task 3: Create BrandStatsTabs Component

**Files:**
- Create: `src/app/analytics/brand-stats/components/BrandStatsTabs.tsx`

**Step 1: Write the tabs component**

```typescript
"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface BrandStatsTabsProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function BrandStatsTabs({ value, onChange, className }: BrandStatsTabsProps) {
  return (
    <Tabs value={value} onValueChange={onChange} className={cn("w-full", className)}>
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="audience">Audience</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
```

**Step 2: Commit tabs component**

```bash
git add src/app/analytics/brand-stats/components/BrandStatsTabs.tsx
git commit -m "feat: add BrandStatsTabs navigation component"
```

---

## Task 4: Create SummaryCards Component

**Files:**
- Create: `src/app/analytics/brand-stats/components/SummaryCards.tsx`

**Step 1: Write the summary cards component**

```typescript
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { brandPerformance } from "@/data/mock";

export function SummaryCards() {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const cards = [
    {
      label: "Total Followers",
      value: formatNumber(brandPerformance.totalFollowers),
      change: brandPerformance.followersGrowth + "%",
    },
    {
      label: "Total Impressions",
      value: formatNumber(brandPerformance.totalImpressions),
      change: brandPerformance.impressionsGrowth + "%",
    },
    {
      label: "Avg. Engagement",
      value: brandPerformance.avgEngagementRate + "%",
      change: "+" + brandPerformance.engagementGrowth + "%",
    },
    {
      label: "Viral Posts",
      value: brandPerformance.viralPosts.toString(),
      change: "+" + brandPerformance.viralPostsGrowth,
    },
    {
      label: "Avg. Likes/Post",
      value: formatNumber(brandPerformance.avgLikesPerPost),
      change: "+" + brandPerformance.avgLikesGrowth + "%",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {cards.map((card) => (
        <Card key={card.label} className="border-border/50 shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">{card.label}</p>
            <p className="text-xl font-semibold">{card.value}</p>
            <Badge
              variant="secondary"
              className="mt-1.5 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            >
              {card.change}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

**Step 2: Commit summary cards**

```bash
git add src/app/analytics/brand-stats/components/SummaryCards.tsx
git commit -m "feat: add SummaryCards component"
```

---

## Task 5: Create OverviewTab Component

**Files:**
- Create: `src/app/analytics/brand-stats/components/OverviewTab.tsx`

**Step 1: Write the overview tab component**

```typescript
"use client";

import { useState } from "react";
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
import { TooltipDot } from "@/components/charts/tooltip/tooltip-dot";
import { TooltipBox } from "@/components/charts/tooltip/tooltip-box";
import { TooltipContent } from "@/components/charts/tooltip/tooltip-content";
import { engagementTrend7d, engagementTrend30d, engagementTrend90d } from "@/data/mock";
import type { EngagementTrend } from "@/data/mock";

export function OverviewTab() {
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("30d");

  const engagementData: Record<string, EngagementTrend[]> = {
    "7d": engagementTrend7d,
    "30d": engagementTrend30d,
    "90d": engagementTrend90d,
  };

  const currentData = engagementData[dateRange];

  const ringData = [
    { label: "YouTube", value: 85, maxValue: 100, color: "#FF0000" },
    { label: "Instagram", value: 72, maxValue: 100, color: "#E4405F" },
    { label: "TikTok", value: 94, maxValue: 100, color: "#000000" },
    { label: "LinkedIn", value: 58, maxValue: 100, color: "#0A66C2" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Platform data for bar chart
  const platformData = [
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
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={4} />
            <ChartTooltip>
              <TooltipBox>
                <TooltipDot />
                <TooltipContent>
                  {(data) => (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{data.point.displayDate}</p>
                      <p className="text-xs text-muted-foreground">Total: {data.point.total.toLocaleString()}</p>
                      <p className="text-xs">Likes: {data.point.likes.toLocaleString()}</p>
                      <p className="text-xs">Comments: {data.point.comments.toLocaleString()}</p>
                      <p className="text-xs">Shares: {data.point.shares.toLocaleString()}</p>
                    </div>
                  )}
                </TooltipContent>
              </TooltipBox>
            </ChartTooltip>
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
            <Bar dataKey="followers" fill="hsl(var(--primary))" radius={4} />
            <ChartTooltip>
              <TooltipBox>
                <TooltipDot />
                <TooltipContent>
                  {(data) => (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{data.point.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {data.point.followers.toLocaleString()} followers
                      </p>
                    </div>
                  )}
                </TooltipContent>
              </TooltipBox>
            </ChartTooltip>
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Step 2: Commit overview tab**

```bash
git add src/app/analytics/brand-stats/components/OverviewTab.tsx
git commit -m "feat: add OverviewTab with Ring, Engagement Trend, and Platform Comparison charts"
```

---

## Task 6: Create AudienceTab Component

**Files:**
- Create: `src/app/analytics/brand-stats/components/AudienceTab.tsx`

**Step 1: Write the audience tab component**

```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { BarYAxis } from "@/components/charts/bar-y-axis";
import { ChartTooltip } from "@/components/charts/tooltip/chart-tooltip";
import { TooltipDot } from "@/components/charts/tooltip/tooltip-dot";
import { TooltipBox } from "@/components/charts/tooltip/tooltip-box";
import { TooltipContent } from "@/components/charts/tooltip/tooltip-content";
import {
  audienceAgeDistribution,
  audienceGender,
  audienceCountries,
  audienceActiveHours,
} from "@/data/mock";

export function AudienceTab() {
  return (
    <div className="space-y-6">
      {/* Age Distribution */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base font-semibold">
            Age Distribution
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Follower age groups
          </p>
        </CardHeader>
        <CardContent>
          <BarChart
            data={audienceAgeDistribution}
            xDataKey="ageGroup"
            margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
            barGap={0.2}
          >
            <BarXAxis />
            <BarYAxis />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
            <ChartTooltip>
              <TooltipBox>
                <TooltipDot />
                <TooltipContent>
                  {(data) => (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{data.point.ageGroup}</p>
                      <p className="text-xs text-muted-foreground">
                        {data.point.count.toLocaleString()} followers ({data.point.percentage}%)
                      </p>
                    </div>
                  )}
                </TooltipContent>
              </TooltipBox>
            </ChartTooltip>
          </BarChart>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Gender Breakdown */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base font-semibold">
              Gender Breakdown
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Follower gender distribution
            </p>
          </CardHeader>
          <CardContent>
            <BarChart
              data={audienceGender}
              xDataKey="gender"
              margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
              barGap={0.2}
            >
              <BarXAxis />
              <BarYAxis />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
              <ChartTooltip>
                <TooltipBox>
                  <TooltipDot />
                  <TooltipContent>
                    {(data) => (
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{data.point.gender}</p>
                        <p className="text-xs text-muted-foreground">
                          {data.point.count.toLocaleString()} ({data.point.percentage}%)
                        </p>
                      </div>
                    )}
                  </TooltipContent>
                </TooltipBox>
              </ChartTooltip>
            </BarChart>
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base font-semibold">
              Top Countries
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Follower distribution by country
            </p>
          </CardHeader>
          <CardContent>
            <BarChart
              data={audienceCountries}
              xDataKey="country"
              orientation="horizontal"
              margin={{ top: 10, right: 60, bottom: 30, left: 60 }}
              barGap={0.2}
              barWidth={24}
            >
              <BarXAxis />
              <BarYAxis />
              <Bar dataKey="followers" fill="hsl(var(--primary))" radius={4} />
              <ChartTooltip>
                <TooltipBox>
                  <TooltipDot />
                  <TooltipContent>
                    {(data) => (
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {data.point.flag} {data.point.country}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {data.point.followers.toLocaleString()} followers
                        </p>
                      </div>
                    )}
                  </TooltipContent>
                </TooltipBox>
              </ChartTooltip>
            </BarChart>
          </CardContent>
        </Card>
      </div>

      {/* Active Hours */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base font-semibold">
            Active Hours
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Engagement by hour of day
          </p>
        </CardHeader>
        <CardContent>
          <BarChart
            data={audienceActiveHours}
            xDataKey="label"
            margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
            barGap={0.1}
            barWidth={20}
          >
            <BarXAxis />
            <BarYAxis />
            <Bar dataKey="engagement" fill="hsl(var(--primary))" radius={2} />
            <ChartTooltip>
              <TooltipBox>
                <TooltipDot />
                <TooltipContent>
                  {(data) => (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{data.point.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {data.point.engagement.toLocaleString()} engagements
                      </p>
                    </div>
                  )}
                </TooltipContent>
              </TooltipBox>
            </ChartTooltip>
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Step 2: Commit audience tab**

```bash
git add src/app/analytics/brand-stats/components/AudienceTab.tsx
git commit -m "feat: add AudienceTab with Age, Gender, Countries, and Active Hours charts"
```

---

## Task 7: Create ContentTab Component

**Files:**
- Create: `src/app/analytics/brand-stats/components/ContentTab.tsx`

**Step 1: Write the content tab component**

```typescript
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FunnelChart } from "@/components/charts/funnel-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { BarYAxis } from "@/components/charts/bar-y-axis";
import { ChartTooltip } from "@/components/charts/tooltip/chart-tooltip";
import { TooltipDot } from "@/components/charts/tooltip/tooltip-dot";
import { TooltipBox } from "@/components/charts/tooltip/tooltip-box";
import { TooltipContent } from "@/components/charts/tooltip/tooltip-content";
import { SankeyChart } from "@/components/charts/sankey";
import { SankeyNode } from "@/components/charts/sankey/sankey-node";
import { SankeyLink } from "@/components/charts/sankey/sankey-link";
import { contentTypePerformance, publishedPosts } from "@/data/mock";
import { PlatformIcon } from "@/components/social/PlatformIcon";
import { TrendingUp, MessageCircle, Share2 } from "lucide-react";

export function ContentTab() {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  // Prepare content type data for bar chart
  const contentChartData = contentTypePerformance.map((item) => ({
    name: item.type,
    posts: item.posts,
    engagement: item.avgEngagement,
  }));

  const topPosts = publishedPosts.slice(0, 5);

  return (
    <div className="space-y-6">
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

        {/* Content Type Performance */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base font-semibold">
              Content Type Performance
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Average engagement by content type
            </p>
          </CardHeader>
          <CardContent>
            <BarChart
              data={contentChartData}
              xDataKey="name"
              margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
              barGap={0.2}
            >
              <BarXAxis />
              <BarYAxis />
              <Bar dataKey="engagement" fill="hsl(var(--primary))" radius={4} />
              <ChartTooltip>
                <TooltipBox>
                  <TooltipDot />
                  <TooltipContent>
                    {(data) => (
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{data.point.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {data.point.engagement}% avg engagement
                        </p>
                        <p className="text-xs">{data.point.posts} posts</p>
                      </div>
                    )}
                  </TooltipContent>
                </TooltipBox>
              </ChartTooltip>
            </BarChart>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Flow */}
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

      {/* Top Posts */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-display text-base font-semibold">
              Top Performing Posts
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Your most viral content
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/analytics">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50"
              >
                <PlatformIcon platform={post.platform} size={32} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground">{post.publishedDate}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>{formatNumber(post.views)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>{formatNumber(post.comments)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="h-3.5 w-3.5" />
                    <span>{formatNumber(post.shares)}</span>
                  </div>
                </div>
                {post.isViral && (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    Viral
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Step 2: Commit content tab**

```bash
git add src/app/analytics/brand-stats/components/ContentTab.tsx
git commit -m "feat: add ContentTab with Funnel, Content Type, Traffic Flow, and Top Posts"
```

---

## Task 8: Update Main Page to Use Tabs

**Files:**
- Modify: `src/app/analytics/brand-stats/page.tsx`

**Step 1: Replace entire page content with new tabbed layout**

```typescript
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
            <Button variant="ghost" size="sm" className="gap-1.5" asChild>
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
```

**Step 2: Commit page update**

```bash
git add src/app/analytics/brand-stats/page.tsx
git commit -m "feat: update brand-stats page with tabbed layout"
```

---

## Task 9: Fix Nested Button Issue (if exists)

**Files:**
- Check: `src/app/analytics/brand-stats/page.tsx`

**Step 1: Verify Button components are properly wrapped**

Ensure any Button inside Link uses `asChild` prop or Link is inside Button (not Button inside Link).

**Step 2: Test in browser**

Check for console errors about nested buttons.

**Step 3: Commit fixes if needed**

```bash
git add src/app/analytics/brand-stats/page.tsx
git commit -m "fix: resolve nested button hydration errors"
```

---

## Task 10: Final Verification

**Files:**
- Test: Browser verification

**Step 1: Run dev server**

```bash
pnpm dev
```

**Step 2: Navigate to `/analytics/brand-stats` and verify:**

1. All 3 tabs work and switch correctly
2. Summary cards display properly
3. Overview tab: Ring chart, Engagement Trend (7/30/90d buttons work), Platform Comparison
4. Audience tab: Age, Gender, Countries, Active Hours charts
5. Content tab: Funnel, Content Type, Traffic Flow, Top Posts list
6. No console errors (especially nested button errors)
7. Responsive layout works on mobile

**Step 3: Commit final changes**

```bash
git add .
git commit -m "feat: complete brand stats 3-tab implementation"
```

---

## Testing Checklist

- [ ] All mock data imported correctly
- [ ] Tabs switch without page reload
- [ ] Charts render with proper data
- [ ] Date range buttons on Engagement Trend work
- [ ] Hover tooltips show on all charts
- [ ] Platform icons display correctly in Top Posts
- [ ] Mobile responsive (1 column → 2 column → full width)
- [ ] No hydration errors in console
- [ ] Back button navigates to /analytics

---

## Notes

- All charts use existing VisX components (BarChart, RingChart, FunnelChart, SankeyChart)
- Mock data follows existing patterns in `src/data/mock.ts`
- Styling uses existing Tailwind utilities and shadcn/ui components
- No new dependencies added
