import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
        <CardContent className="space-y-4">
          <StackedBarChart data={data} platforms={platforms} />
          <div className="flex justify-end pt-4">
            <Button variant="ghost">
              <Link href="/analytics/brand-stats" className="gap-1 w-fit">
                More Data
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
