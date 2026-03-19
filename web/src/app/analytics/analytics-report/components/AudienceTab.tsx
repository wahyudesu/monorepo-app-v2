"use client";

import { useMemo, type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { PieChart, PieSlice } from "@/components/charts";
import { ChartTooltip } from "@/components/charts/tooltip/chart-tooltip";
import { ChoroplethChart } from "@/components/charts/choropleth/choropleth-chart";
import { ChoroplethGraticule } from "@/components/charts/choropleth/choropleth-graticule";
import { ChoroplethTooltip } from "@/components/charts/choropleth/choropleth-tooltip";
import { ChoroplethFeature } from "@/components/charts/choropleth/choropleth-feature";
import type { ChoroplethFeature as ChoroplethFeatureType } from "@/components/charts/choropleth/choropleth-context";
import {
  audienceAgeDistribution,
  audienceGender,
  audienceActiveHours,
} from "@/data/mock";
import { worldGeoJson } from "@/data/world-geojson";

// Dummy visitor data by country name
const visitorData: Record<string, number> = {
  "United States of America": 98500,
  "Indonesia": 87500,
  "United Kingdom": 72000,
  "Japan": 65000,
  "Germany": 58000,
  "France": 52000,
  "Brazil": 48000,
  "India": 45000,
  "Australia": 42000,
  "Canada": 38000,
  "South Korea": 35000,
  "Italy": 32000,
  "Spain": 28000,
  "Mexico": 25000,
  "Netherlands": 22000,
  "Russia": 20000,
  "Singapore": 18000,
  "Thailand": 15000,
  "Malaysia": 12000,
  "Philippines": 10000,
  "Vietnam": 8000,
  "Poland": 7500,
  "Sweden": 7000,
  "Norway": 6500,
  "Denmark": 6000,
  "Finland": 5500,
  "Belgium": 5000,
  "Switzerland": 4500,
  "Austria": 4000,
  "Portugal": 3500,
};

// Color scale based on visitor count
const getVisitorColorDiscrete = (visitorCount: number | undefined): string => {
  if (!visitorCount || visitorCount === 0) {
    return "hsl(var(--muted) / 0.2)"; // No data
  }

  if (visitorCount >= 80000) return "hsl(142 76% 36%)"; // Dark green - highest
  if (visitorCount >= 50000) return "hsl(142 76% 50%)"; // Medium green
  if (visitorCount >= 30000) return "hsl(142 76% 65%)"; // Light green
  if (visitorCount >= 10000) return "hsl(142 76% 80%)"; // Very light green
  return "hsl(142 76% 90%)"; // Pale green - lowest
};

const colorScale = [
  { label: "80K+", color: "hsl(142 76% 36%)" },
  { label: "50K-80K", color: "hsl(142 76% 50%)" },
  { label: "30K-50K", color: "hsl(142 76% 65%)" },
  { label: "10K-30K", color: "hsl(142 76% 80%)" },
  { label: "<10K", color: "hsl(142 76% 90%)" },
  { label: "No Data", color: "hsl(var(--muted) / 0.2)" },
];

export function AudienceTab() {
  // Merge visitor data with GeoJSON
  const geoJsonWithVisitors = useMemo(() => {
    return {
      ...worldGeoJson,
      features: worldGeoJson.features.map((feature) => ({
        ...feature,
        properties: {
          ...feature.properties,
          visitors: visitorData[feature.properties?.name || ""] || 0,
        },
      })),
    };
  }, []);

  return (
    <div className="space-y-6">
        {/* World Map - Visitor Distribution */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-sm font-semibold">
              Visitor Distribution by Country
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Global audience reach and engagement
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <ChoroplethChart data={geoJsonWithVisitors} aspectRatio="2.5 / 1">
                <ChoroplethGraticule />
                <ChoroplethFeature
                  getFeatureColor={(feature: ChoroplethFeatureType) => {
                    const visitors = feature.properties?.visitors as number | undefined;
                    return getVisitorColorDiscrete(visitors);
                  }}
                />
                <ChoroplethTooltip
                  getFeatureValue={(feature: ChoroplethFeatureType) => {
                    return feature.properties?.visitors as number | undefined;
                  }}
                  valueLabel="Visitors"
                />
              </ChoroplethChart>

              {/* Color Scale Legend */}
              <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
                <span className="text-muted-foreground mr-2">Visitors:</span>
                {colorScale.map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <div
                      className="h-2.5 w-2.5 rounded-sm border border-border/50"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Age, Gender, Location Distribution - 3 columns */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Age Distribution */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-sm font-semibold">
                  Age Distribution
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Follower age groups
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <BarChart
                  data={audienceAgeDistribution as unknown as Record<string, unknown>[]}
                  xDataKey="ageGroup"
                  margin={{ top: 5, right: 5, bottom: 20, left: 30 }}
                  barGap={0.1}
                  barWidth={12}
                  aspectRatio="4 / 3"
                >
                  <BarXAxis maxLabels={6} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" lineCap="butt" />
                  <ChartTooltip
                    content={(data): ReactNode => (
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{data.point.ageGroup as string}</p>
                        <p className="text-xs text-muted-foreground">
                          {(data.point.count as number).toLocaleString()} ({data.point.percentage as number}%)
                        </p>
                      </div>
                    )}
                  />
                </BarChart>
              </CardContent>
            </Card>

            {/* Gender Breakdown */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-sm font-semibold">
                  Gender Breakdown
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Follower gender distribution
                </p>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-2 pt-0">
                <PieChart
                  data={audienceGender.map((item, index) => ({
                    label: item.gender,
                    value: item.count,
                  }))}
                  size={140}
                >
                  {audienceGender.map((item, index) => (
                    <PieSlice hoverEffect="grow" index={index} key={item.gender} />
                  ))}
                </PieChart>

                <div className="grid grid-cols-3 gap-2 w-full">
                  {audienceGender.map((item, index) => (
                    <div
                      key={item.gender}
                      className="flex flex-col items-center gap-0.5"
                    >
                      <div className="flex items-center gap-1.5">
                        <div
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: `var(--chart-${index + 1})` }}
                        />
                        <span className="text-xs font-medium">{item.gender}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Locations */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="font-display text-sm font-semibold">
                  Top Locations
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  By follower count
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {[
                    { country: "Indonesia", count: 87500, percent: 35 },
                    { country: "USA", count: 98500, percent: 28 },
                    { country: "UK", count: 72000, percent: 15 },
                    { country: "Japan", count: 65000, percent: 10 },
                    { country: "Germany", count: 58000, percent: 7 },
                  ].map((item, index) => (
                    <div key={item.country} className="flex items-center gap-2">
                      <span className="text-xs font-medium w-20 truncate">{item.country}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-10 text-right">{item.percent}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Hours - 2 columns compact */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-1 pt-4">
                <CardTitle className="font-display text-sm font-semibold">
                  Active Hours
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Engagement by hour of day
                </p>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <BarChart
                  data={audienceActiveHours as unknown as Record<string, unknown>[]}
                  xDataKey="label"
                  margin={{ top: 5, right: 5, bottom: 15, left: 25 }}
                  barGap={0.05}
                  barWidth={8}
                  aspectRatio="4 / 1"
                >
                  <BarXAxis maxLabels={8} />
                  <Bar dataKey="engagement" fill="hsl(var(--primary))" lineCap="butt" />
                  <ChartTooltip
                    content={(data): ReactNode => (
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{data.point.label as string}</p>
                        <p className="text-xs text-muted-foreground">
                          {(data.point.engagement as number).toLocaleString()} engagements
                        </p>
                      </div>
                    )}
                  />
                </BarChart>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-1 pt-4">
                <CardTitle className="font-display text-sm font-semibold">
                  Best Time to Post
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Optimal posting times
                </p>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-primary/10 text-center">
                    <p className="text-sm font-semibold">19-21</p>
                    <p className="text-xs text-muted-foreground">Peak</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted/50 text-center">
                    <p className="text-sm font-semibold">12-14</p>
                    <p className="text-xs text-muted-foreground">Good</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-muted/50 text-center">
                    <p className="text-sm font-semibold">02-06</p>
                    <p className="text-xs text-muted-foreground">Avoid</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
    </div>
  );
}

