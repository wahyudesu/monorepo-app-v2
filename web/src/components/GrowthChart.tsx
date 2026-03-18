"use client";

import { memo, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { socialAccounts, type Platform } from "@/data/mock";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const platformNames: Record<Platform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  twitter: "Twitter/X",
  youtube: "YouTube",
};

// Hoist static legend outside component to avoid recreation
const ChartLegend = socialAccounts.map((a) => (
  <span key={a.platform} className="flex items-center gap-1.5">
    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: `hsl(${a.color})` }} />
    {platformNames[a.platform]}
  </span>
));

function GrowthChartSkeleton() {
  return (
    <div className="h-[220px] animate-pulse bg-muted/30 rounded-lg" />
  );
}

interface GrowthChartProps {
  data: Array<{
    day: string;
    instagram: number;
    tiktok: number;
    twitter: number;
    youtube: number;
  }>;
}

function GrowthChartInner({ data }: GrowthChartProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-base font-semibold">Follower Growth (7 days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="day" className="text-xs" tick={{ fill: "hsl(220 10% 46%)", fontSize: 11 }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(220 10% 46%)", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 100%)",
                  border: "1px solid hsl(220 14% 90%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="tiktok" stackId="1" stroke="hsl(349 70% 56%)" fill="hsl(349 70% 56% / 0.3)" />
              <Area type="monotone" dataKey="youtube" stackId="1" stroke="hsl(0 72% 51%)" fill="hsl(0 72% 51% / 0.3)" />
              <Area type="monotone" dataKey="instagram" stackId="1" stroke="hsl(328 70% 55%)" fill="hsl(328 70% 55% / 0.3)" />
              <Area type="monotone" dataKey="twitter" stackId="1" stroke="hsl(203 89% 53%)" fill="hsl(203 89% 53% / 0.3)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex items-center justify-center gap-4 text-[11px]">
          {ChartLegend}
        </div>
      </CardContent>
    </Card>
  );
}

export const GrowthChart = memo(function GrowthChart(props: GrowthChartProps) {
  return (
    <Suspense fallback={<GrowthChartSkeleton />}>
      <GrowthChartInner {...props} />
    </Suspense>
  );
});
