"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FunnelChart } from "@/components/charts/funnel-chart";
import { PieChart, PieSlice } from "@/components/charts";
import { BarChart, Bar, Grid, BarXAxis, ChartTooltip } from "@/components/charts";
import { engagementTrend7d, engagementTrend30d, engagementTrend90d } from "@/data/mock";
import type { EngagementTrend } from "@/data/mock";

// Prediction data for each date range
const predictionData: Record<string, { day: string; predicted: number }[]> = {
  "7d": [
    { day: "Mar 19", predicted: 78000 },
    { day: "Mar 20", predicted: 82000 },
    { day: "Mar 21", predicted: 79000 },
  ],
  "30d": [
    { day: "Mar 19", predicted: 78000 },
    { day: "Mar 20", predicted: 82000 },
    { day: "Mar 21", predicted: 79000 },
    { day: "Mar 22", predicted: 85000 },
    { day: "Mar 23", predicted: 81000 },
    { day: "Mar 24", predicted: 83000 },
    { day: "Mar 25", predicted: 87000 },
  ],
  "90d": [
    { day: "Mar 19", predicted: 78000 },
    { day: "Mar 22", predicted: 82000 },
    { day: "Mar 25", predicted: 79000 },
    { day: "Mar 28", predicted: 85000 },
    { day: "Mar 31", predicted: 88000 },
    { day: "Apr 3", predicted: 84000 },
    { day: "Apr 6", predicted: 90000 },
  ],
};

// Mock data for engagement funnel
const engagementFunnelData = [
  { label: "Impressions", value: 12450000 },
  { label: "Engagements", value: 892000 },
  { label: "Conversions", value: 34500 },
];

// Mock data for engagement pie chart
const pieData = [
  { label: "Likes", value: 720000 },
  { label: "Comments", value: 34500 },
  { label: "Shares", value: 125000 },
  { label: "Saves", value: 28000 },
];

export function FunnelTab() {
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("30d");

  const engagementData: Record<string, EngagementTrend[]> = {
    "7d": engagementTrend7d,
    "30d": engagementTrend30d,
    "90d": engagementTrend90d,
  };

      const currentData = engagementData[dateRange] as unknown as Record<string, unknown>[];
      const predictions = predictionData[dateRange];
      
      // Combine actual data with prediction data
      const combinedData = [
        ...currentData.map((d) => ({ 
          day: d.displayDate, 
          value: d.total, 
          predicted: null as number | null 
        })),
        ...predictions.map((p) => ({ 
          day: p.day, 
          value: null as number | null, 
          predicted: p.predicted 
        })),
      ];

      // Calculate total predicted engagement
      const totalPredicted = predictions.reduce((sum, p) => sum + p.predicted, 0);

    return (
    <div className="space-y-6">
      {/* Engagement Funnel */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base font-semibold">
            Engagement Funnel
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Track your customer journey from impressions to conversions
          </p>
        </CardHeader>
        <CardContent>
          <FunnelChart
            data={engagementFunnelData}
            orientation="horizontal"
            color="hsl(var(--primary))"
            layers={3}
            showPercentage
            showValues
            showLabels
            staggerDelay={0.1}
            edges="curved"
            labelLayout="spread"
            grid={{ bands: true, lines: true }}
          />
        </CardContent>
      </Card>

        {/* Charts Row - Pie Chart and Line Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Engagements Pie Chart */}
          <Card className="border-border/50 shadow-sm lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base font-semibold">
              Engagements Breakdown
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Distribution of engagement types
            </p>
          </CardHeader>
                <CardContent className="flex flex-col items-center gap-3">
                  <PieChart data={pieData} size={220}>
                    {pieData.map((item, index) => (
                      <PieSlice hoverEffect="grow" index={index} key={item.label} />
                    ))}
                  </PieChart>

                <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full">
              {pieData.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2"
                >
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: `var(--chart-${index + 1})` }}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm text-muted-foreground ml-auto">{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
          </CardContent>
        </Card>

            {/* Engagement Trend Line Chart */}
            <Card className="border-border/50 shadow-sm lg:col-span-2">
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
              <CardContent className="space-y-4">
                <BarChart
                  data={combinedData}
                  xDataKey="day"
                  barGap={0.1}
                  aspectRatio="4 / 1"
                >
                  <Grid horizontal />
                  <Bar dataKey="value" lineCap="butt" />
                  <Bar dataKey="predicted" lineCap="butt" fill="hsl(var(--primary) / 0.3)" stroke="hsl(var(--primary))" />
                  <BarXAxis maxLabels={8} />
                  <ChartTooltip />
                </BarChart>
                
                {/* Prediction Summary */}
                <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm bg-primary" />
                    <span className="text-xs text-muted-foreground">Actual</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-sm border-2 border-dashed border-primary bg-primary/30" />
                    <span className="text-xs text-muted-foreground">Predicted</span>
                  </div>
                  <div className="ml-auto text-xs">
                    <span className="text-muted-foreground">Predicted total: </span>
                    <span className="font-semibold text-foreground">{totalPredicted.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
