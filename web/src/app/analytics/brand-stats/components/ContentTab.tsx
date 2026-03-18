import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FunnelChart } from "@/components/charts/funnel-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { BarYAxis } from "@/components/charts/bar-y-axis";
import { ChartTooltip } from "@/components/charts/tooltip/chart-tooltip";
import { SankeyChart } from "@/components/charts/sankey";
import { SankeyNode } from "@/components/charts/sankey/sankey-node";
import { SankeyLink } from "@/components/charts/sankey/sankey-link";
import { contentTypePerformance, publishedPosts } from "@/data/mock";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
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
              <Bar dataKey="engagement" fill="hsl(var(--primary))" lineCap={4} />
              <ChartTooltip
                content={(data) => (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{String(data.point.name)}</p>
                    <p className="text-xs text-muted-foreground">
                      {String(data.point.engagement)}% avg engagement
                    </p>
                    <p className="text-xs">{String(data.point.posts)} posts</p>
                  </div>
                )}
              />
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
          <Link
            href="/analytics"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View All
          </Link>
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
