import { useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import type { PostAnalyticsData, AnalyticsPlatformConfig } from "@/data/mock";

interface StackedBarChartProps {
  data: PostAnalyticsData[];
  platforms: AnalyticsPlatformConfig[];
}

function formatChartValue(value: number): string {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
  if (value >= 1000) return (value / 1000).toFixed(0) + "K";
  return value.toString();
}

export function StackedBarChart({ data, platforms }: StackedBarChartProps) {
  // Calculate max value for Y axis
  const maxValue = useMemo(() => {
    return Math.max(
      ...data.map((d) =>
        platforms.reduce((sum, p) => sum + ((d as unknown as Record<string, number>)[p.id] || 0), 0)
      )
    );
  }, [data, platforms]);

  // Transform data for the chart - use displayDate as the x-axis
  const chartData = useMemo(() => {
    return data.map((d) => ({
      ...d,
      name: d.displayDate,
    }));
  }, [data]);

  // Chart config for shadcn
  const chartConfig = useMemo(() => {
    const config: Record<string, { label: string; color: string; icon?: React.ComponentType<{ className?: string }> }> = {};
    platforms.forEach((p) => {
      config[p.id] = {
        label: p.name,
        color: p.color,
        icon: undefined,
      };
    });
    return config;
  }, [platforms]);

  // Dynamic tick interval based on data length
  const tickInterval = useMemo(() => {
    const dataLength = data.length;
    if (dataLength <= 7) return 0;
    if (dataLength <= 30) return Math.floor(dataLength / 10);
    return Math.floor(dataLength / 12);
  }, [data.length]);

  return (
    <div className="space-y-4">
      {/* Chart */}
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="3,3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval={tickInterval}
            tickFormatter={(value) => String(value)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => formatChartValue(value as number)}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name) => (
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{
                          backgroundColor: chartConfig[name as string]?.color || "#888"
                        }}
                      />
                      <span className="text-sm text-foreground font-medium">
                        {chartConfig[name as string]?.label}
                      </span>
                    </div>
                    <span className="text-sm font-semibold font-display">
                      {formatChartValue(value as number)}
                    </span>
                  </div>
                )}
              />
            }
          />
          {platforms.map((platform) => (
            <Bar
              key={platform.id}
              dataKey={platform.id}
              stackId="stack"
              fill={platform.color}
              radius={[0, 0, 0, 0]}
            />
          ))}
        </BarChart>
      </ChartContainer>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
        {platforms.map((platform) => (
          <div key={platform.id} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: platform.color }}
            />
            <span className="text-muted-foreground">
              {platform.icon} {platform.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
