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
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base font-semibold">
            Visitor Distribution by Country
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Global audience reach and engagement
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ChoroplethChart data={geoJsonWithVisitors} aspectRatio="2 / 1">
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
                    className="h-3 w-3 rounded-sm border border-border/50"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
        {/* Age Distribution & Gender Breakdown - 3 columns */}
        <div className="grid gap-6 md:grid-cols-3">
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
                data={audienceAgeDistribution as unknown as Record<string, unknown>[]}
                xDataKey="ageGroup"
                margin={{ top: 10, right: 10, bottom: 30, left: 40 }}
                barGap={0.1}
                barWidth={16}
                aspectRatio="3 / 2"
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

          {/* Gender Breakdown - Pie Chart */}
          <Card className="border-border/50 shadow-sm md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base font-semibold">
                Gender Breakdown
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Follower gender distribution
              </p>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3">
              <PieChart
                data={audienceGender.map((item, index) => ({
                  label: item.gender,
                  value: item.count,
                }))}
                size={200}
              >
                {audienceGender.map((item, index) => (
                  <PieSlice hoverEffect="grow" index={index} key={item.gender} />
                ))}
              </PieChart>

              <div className="grid grid-cols-3 gap-x-6 gap-y-2 w-full">
                {audienceGender.map((item, index) => (
                  <div
                    key={item.gender}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: `var(--chart-${index + 1})` }}
                      />
                      <span className="text-sm font-medium">{item.gender}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Hours - 3 columns */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border/50 shadow-sm md:col-span-2">
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
                data={audienceActiveHours as unknown as Record<string, unknown>[]}
                xDataKey="label"
                margin={{ top: 10, right: 10, bottom: 30, left: 40 }}
                barGap={0.1}
                barWidth={12}
                aspectRatio="3 / 1"
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
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base font-semibold">
                Best Time to Post
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Optimal posting times
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-primary/10">
                  <div>
                    <p className="text-sm font-medium">Peak</p>
                    <p className="text-xs text-muted-foreground">Highest</p>
                  </div>
                  <p className="text-sm font-semibold">19-21</p>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">Good</p>
                    <p className="text-xs text-muted-foreground">Above avg</p>
                  </div>
                  <p className="text-sm font-semibold">12-14</p>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">Avoid</p>
                    <p className="text-xs text-muted-foreground">Low</p>
                  </div>
                  <p className="text-sm font-semibold">02-06</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}

