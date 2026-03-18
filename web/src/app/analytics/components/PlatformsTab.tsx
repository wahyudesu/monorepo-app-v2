import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { platformStats, analyticsPlatforms } from "@/data/mock";
import { PlatformIcon, type Platform } from "@/components/ui/PlatformIcon";

export function PlatformsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {platformStats.map((stats) => {
        const platform = analyticsPlatforms.find((p) => p.id === stats.platform);
        if (!platform) return null;

        return (
          <Card key={stats.platform} className="border-border/50 overflow-hidden">
            <CardContent className="p-4">
              {/* Platform Header */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${platform.color}15` }}
                >
                  <PlatformIcon platform={stats.platform as Platform} size={20} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs",
                  stats.trend === "up" && "text-emerald-500",
                  stats.trend === "down" && "text-rose-500",
                  stats.trend === "neutral" && "text-muted-foreground"
                )}>
                  {stats.trend === "up" && <TrendingUp className="h-3.5 w-3.5" />}
                  {stats.trend === "down" && <TrendingDown className="h-3.5 w-3.5" />}
                  {stats.trend === "neutral" && <Minus className="h-3.5 w-3.5" />}
                </div>
              </div>

              {/* Platform Name */}
              <h3 className="font-semibold text-sm mb-3">{platform.name}</h3>

              {/* Stats */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-muted-foreground">Posts</span>
                  <span className="text-sm font-medium">{stats.posts.toLocaleString()}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-muted-foreground">Engagement</span>
                  <span className="text-sm font-medium">{stats.avgEngagement}%</span>
                </div>
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-muted-foreground">Success Rate</span>
                    <span className="text-xs font-semibold">{stats.successRate}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${stats.successRate}%`,
                        backgroundColor: platform.color
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
