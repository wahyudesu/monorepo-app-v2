"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  socialAccounts,
  brandPerformance,
  analyticsPlatforms,
  type AnalyticsPlatform,
} from "@/data/mock";
import { PlatformIcon } from "@/components/social/PlatformIcon";
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

// Extended stats for each platform
const extendedPlatformStats: Record<AnalyticsPlatform, {
  reach: number;
  reachGrowth: string;
  clicks: number;
  clicksGrowth: string;
  saves: number;
  savesGrowth: string;
  shares: number;
  sharesGrowth: string;
  bestPostTime: string;
  topHashtag: string;
}> = {
  youtube: {
    reach: 1850000,
    reachGrowth: "+18.2%",
    clicks: 45000,
    clicksGrowth: "+12.4%",
    saves: 8900,
    savesGrowth: "+8.1%",
    shares: 12300,
    sharesGrowth: "+15.6%",
    bestPostTime: "Sat 7PM",
    topHashtag: "#Tutorial",
  },
  facebook: {
    reach: 890000,
    reachGrowth: "+5.3%",
    clicks: 23000,
    clicksGrowth: "+3.2%",
    saves: 4500,
    savesGrowth: "+2.1%",
    shares: 8900,
    sharesGrowth: "+6.4%",
    bestPostTime: "Wed 1PM",
    topHashtag: "#Tips",
  },
  instagram: {
    reach: 1280000,
    reachGrowth: "+12.5%",
    clicks: 67000,
    clicksGrowth: "+18.3%",
    saves: 34500,
    savesGrowth: "+24.6%",
    shares: 15600,
    sharesGrowth: "+12.8%",
    bestPostTime: "Thu 6PM",
    topHashtag: "#BehindTheScenes",
  },
  tiktok: {
    reach: 2400000,
    reachGrowth: "+24.3%",
    clicks: 89000,
    clicksGrowth: "+32.1%",
    saves: 56000,
    savesGrowth: "+45.2%",
    shares: 78900,
    sharesGrowth: "+28.4%",
    bestPostTime: "Fri 8PM",
    topHashtag: "#Viral",
  },
  linkedin: {
    reach: 420000,
    reachGrowth: "+8.7%",
    clicks: 12000,
    clicksGrowth: "+6.5%",
    saves: 2300,
    savesGrowth: "+4.2%",
    shares: 4500,
    sharesGrowth: "+9.1%",
    bestPostTime: "Tue 9AM",
    topHashtag: "#Business",
  },
  twitter: {
    reach: 89000,
    reachGrowth: "-3.1%",
    clicks: 5600,
    clicksGrowth: "-1.2%",
    saves: 1200,
    savesGrowth: "-0.8%",
    shares: 3400,
    sharesGrowth: "+2.1%",
    bestPostTime: "Mon 10AM",
    topHashtag: "#Tech",
  },
  pinterest: {
    reach: 340000,
    reachGrowth: "+6.8%",
    clicks: 18000,
    clicksGrowth: "+9.4%",
    saves: 45000,
    savesGrowth: "+12.3%",
    shares: 2100,
    sharesGrowth: "+5.6%",
    bestPostTime: "Sun 8PM",
    topHashtag: "#Inspiration",
  },
  threads: {
    reach: 125000,
    reachGrowth: "+42.5%",
    clicks: 8900,
    clicksGrowth: "+38.2%",
    saves: 2100,
    savesGrowth: "+28.4%",
    shares: 1200,
    sharesGrowth: "+18.6%",
    bestPostTime: "Daily 9PM",
    topHashtag: "#Discussion",
  },
};

export default function BrandStatsPage() {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

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

      {/* Platform Stats */}
      <div className="space-y-4">
        <h2 className="font-display text-lg font-semibold">Platform Breakdown</h2>
        <div className="grid gap-4">
          {analyticsPlatforms.map((platform) => {
            const stats = extendedPlatformStats[platform.id];
            const account = socialAccounts.find((a) => a.platform === platform.id);
            const isPositive = stats.reachGrowth.startsWith("+");

            return (
              <Card key={platform.id} className="border-border/50 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${platform.color}15` }}
                      >
                        <PlatformIcon platform={platform.id} size={20} className="text-foreground" />
                      </div>
                      <div>
                        <CardTitle className="font-display text-base font-semibold">
                          {platform.name}
                        </CardTitle>
                        {account && (
                          <p className="text-xs text-muted-foreground">{account.handle}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        {formatNumber(account?.followers || 0)}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          isPositive
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {stats.reachGrowth}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {/* Reach */}
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Reach</p>
                      <p className="text-sm font-medium">{formatNumber(stats.reach)}</p>
                      <p className={`text-xs ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
                        {stats.reachGrowth}
                      </p>
                    </div>

                    {/* Clicks */}
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Clicks</p>
                      <p className="text-sm font-medium">{formatNumber(stats.clicks)}</p>
                      <p className="text-xs text-emerald-600">{stats.clicksGrowth}</p>
                    </div>

                    {/* Saves */}
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Saves</p>
                      <p className="text-sm font-medium">{formatNumber(stats.saves)}</p>
                      <p className="text-xs text-emerald-600">{stats.savesGrowth}</p>
                    </div>

                    {/* Shares */}
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Shares</p>
                      <p className="text-sm font-medium">{formatNumber(stats.shares)}</p>
                      <p className="text-xs text-emerald-600">{stats.sharesGrowth}</p>
                    </div>

                    {/* Best Post Time */}
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Best Time</p>
                      <p className="text-sm font-medium">{stats.bestPostTime}</p>
                    </div>

                    {/* Top Hashtag */}
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Top Hashtag</p>
                      <p className="text-sm font-medium">{stats.topHashtag}</p>
                    </div>
                  </div>

                  {/* Engagement Progress */}
                  {account && (
                    <div className="mt-4 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Engagement Rate</span>
                        <span className="font-medium">{account.engagement}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(account.engagement * 10, 100)}%`,
                            backgroundColor: platform.color,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
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
          <CardContent>
            <RingChart
              data={[
                { label: "YouTube", value: 85, maxValue: 100, color: "#FF0000" },
                { label: "Instagram", value: 72, maxValue: 100, color: "#E4405F" },
                { label: "TikTok", value: 94, maxValue: 100, color: "#000000" },
                { label: "LinkedIn", value: 58, maxValue: 100, color: "#0A66C2" },
              ]}
              size={200}
            >
              <Ring index={0} />
              <Ring index={1} />
              <Ring index={2} />
              <Ring index={3} />
              <RingCenter
                defaultLabel="Avg Progress"
                suffix="%"
              />
            </RingChart>
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
