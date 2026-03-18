import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { platformStats, analyticsPlatforms } from "@/data/mock";

export function PlatformsTab() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {platformStats.map((stats) => {
        const platform = analyticsPlatforms.find((p) => p.id === stats.platform);
        if (!platform) return null;

        return (
          <Card key={stats.platform} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Platform Icon */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-xl"
                  style={{ backgroundColor: `${platform.color}15` }}
                >
                  {platform.icon}
                </div>

                {/* Platform Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{platform.name}</h3>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px]",
                        stats.trend === "up" && "border-success/30 text-success bg-success/5",
                        stats.trend === "down" && "border-destructive/30 text-destructive bg-destructive/5",
                        stats.trend === "neutral" && "border-muted-foreground/30 text-muted-foreground bg-muted"
                      )}
                    >
                      {stats.trend === "up" && <TrendingUp className="h-2.5 w-2.5 mr-0.5" />}
                      {stats.trend === "down" && <TrendingDown className="h-2.5 w-2.5 mr-0.5" />}
                      {stats.trend === "neutral" && <Minus className="h-2.5 w-2.5 mr-0.5" />}
                      {stats.trend === "up" ? "Growing" : stats.trend === "down" ? "Declining" : "Stable"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stats.posts.toLocaleString()} total posts
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-right">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Success Rate</p>
                    <p className="text-sm font-semibold text-success font-display">
                      {stats.successRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Avg Engagement</p>
                    <p className="text-sm font-semibold font-display">
                      {stats.avgEngagement}%
                    </p>
                  </div>
                  <div className="w-16">
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-success rounded-full"
                        style={{ width: `${stats.successRate}%` }}
                      />
                    </div>
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
