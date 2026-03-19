"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StackedBarChart } from "./StackedBarChart";
import { FollowersLineChart } from "./FollowersLineChart";
import type {
  PostAnalyticsData,
  AnalyticsPlatformConfig,
  FollowersData,
} from "@/data/mock";

interface OverviewTabProps {
  data: PostAnalyticsData[];
  platforms: AnalyticsPlatformConfig[];
  followersData: FollowersData[];
}

type ChartType = "distribution" | "followers";

const chartOptions: { value: ChartType; label: string }[] = [
  { value: "distribution", label: "Post Distribution by Platform" },
  { value: "followers", label: "Followers by Platform" },
];

export function OverviewTab({
  data,
  platforms,
  followersData,
}: OverviewTabProps) {
  const [selectedChart, setSelectedChart] = useState<ChartType>("distribution");

  return (
    <div className="space-y-6">
i      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Select
              value={selectedChart}
              onValueChange={(value) => setSelectedChart(value as ChartType)}
            >
              <SelectTrigger className="group h-8 w-auto border-0 bg-transparent text-lg font-semibold shadow-none focus:ring-0 hover:bg-zinc-100 dark:hover:bg-zinc-800 [&_svg]:opacity-0 [&_svg]:transition-opacity [&_svg]:duration-200 group-hover:[&_svg]:opacity-100">
                <SelectValue className="min-w-60 text-lg font-medium">
                  {
                    chartOptions.find((opt) => opt.value === selectedChart)
                      ?.label
                  }
                </SelectValue>
              </SelectTrigger>
                <SelectContent className="min-w-60">
                  {chartOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-base font-medium">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedChart === "distribution" ? (
            <StackedBarChart data={data} platforms={platforms} />
          ) : (
            <FollowersLineChart data={followersData} platforms={platforms} />
          )}
          <div className="flex justify-end pt-4">
            <Button variant="ghost">
              <Link href="/analytics/analytics-report" className="gap-1 w-fit">
                More Data
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
