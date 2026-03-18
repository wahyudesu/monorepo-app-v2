import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StackedBarChart } from "./StackedBarChart";
import type { PostAnalyticsData, AnalyticsPlatformConfig } from "@/data/mock";

interface OverviewTabProps {
  data: PostAnalyticsData[];
  platforms: AnalyticsPlatformConfig[];
}

export function OverviewTab({ data, platforms }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-base font-semibold">
            Post Distribution by Platform
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StackedBarChart data={data} platforms={platforms} />
        </CardContent>
      </Card>
    </div>
  );
}
