"use client";

import { memo, Suspense } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

interface WeeklyTasksChartProps {
  data: Array<{
    day: string;
    completed: number;
    created: number;
  }>;
  config: Record<string, { label: string; color: string }>;
}

function WeeklyTasksChartSkeleton() {
  return (
    <div className="h-[220px] w-full animate-pulse bg-muted/30 rounded-lg" />
  );
}

function WeeklyTasksChartInner({
  data,
  config,
}: WeeklyTasksChartProps) {
  return (
    <ChartContainer config={config} className="h-[220px] w-full">
      <BarChart data={data} barGap={4}>
        <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs" />
        <YAxis tickLine={false} axisLine={false} className="text-xs" width={24} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="created" fill="var(--color-created)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

export const WeeklyTasksChart = memo(function WeeklyTasksChart(props: WeeklyTasksChartProps) {
  return (
    <Suspense fallback={<WeeklyTasksChartSkeleton />}>
      <WeeklyTasksChartInner {...props} />
    </Suspense>
  );
});
