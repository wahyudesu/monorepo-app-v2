"use client";

import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { BarYAxis } from "@/components/charts/bar-y-axis";
import { ChartTooltip } from "@/components/charts/tooltip/chart-tooltip";
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
            data={audienceAgeDistribution as unknown as Record<string, unknown>[]}
            xDataKey="ageGroup"
            margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
            barGap={0.2}
          >
            <BarXAxis />
            <BarYAxis />
            <Bar dataKey="count" fill="hsl(var(--primary))" lineCap={4} />
            <ChartTooltip
              content={(data): ReactNode => (
                <div className="space-y-1">
                  <p className="text-sm font-medium">{data.point.ageGroup as string}</p>
                  <p className="text-xs text-muted-foreground">
                    {(data.point.count as number).toLocaleString()} followers ({data.point.percentage as number}%)
                  </p>
                </div>
              )}
            />
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
              data={audienceGender as unknown as Record<string, unknown>[]}
              xDataKey="gender"
              margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
              barGap={0.2}
            >
              <BarXAxis />
              <BarYAxis />
              <Bar dataKey="count" fill="hsl(var(--primary))" lineCap={4} />
              <ChartTooltip
                content={(data): ReactNode => (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{data.point.gender as string}</p>
                    <p className="text-xs text-muted-foreground">
                      {(data.point.count as number).toLocaleString()} ({data.point.percentage as number}%)
                    </p>
                  </div>
                )}
              />
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
              data={audienceCountries as unknown as Record<string, unknown>[]}
              xDataKey="country"
              orientation="horizontal"
              margin={{ top: 10, right: 60, bottom: 30, left: 60 }}
              barGap={0.2}
              barWidth={24}
            >
              <BarXAxis />
              <BarYAxis />
              <Bar dataKey="followers" fill="hsl(var(--primary))" lineCap={4} />
              <ChartTooltip
                content={(data): ReactNode => (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {data.point.flag as string} {data.point.country as string}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(data.point.followers as number).toLocaleString()} followers
                    </p>
                  </div>
                )}
              />
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
            data={audienceActiveHours as unknown as Record<string, unknown>[]}
            xDataKey="label"
            margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
            barGap={0.1}
            barWidth={20}
          >
            <BarXAxis />
            <BarYAxis />
            <Bar dataKey="engagement" fill="hsl(var(--primary))" lineCap={4} />
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
    </div>
  );
}
