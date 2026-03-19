import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { brandPerformance } from "@/data/mock";

export function SummaryCards() {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const cards = [
    {
      label: "Total Followers",
      value: formatNumber(brandPerformance.totalFollowers),
      change: brandPerformance.followersGrowth + "%",
    },
    {
      label: "Total Impressions",
      value: formatNumber(brandPerformance.totalImpressions),
      change: brandPerformance.impressionsGrowth + "%",
    },
    {
      label: "Avg. Engagement",
      value: brandPerformance.avgEngagementRate + "%",
      change: "+" + brandPerformance.engagementGrowth + "%",
    },
    {
      label: "Viral Posts",
      value: brandPerformance.viralPosts.toString(),
      change: "+" + brandPerformance.viralPostsGrowth,
    },
    {
      label: "Avg. Likes/Post",
      value: formatNumber(brandPerformance.avgLikesPerPost),
      change: "+" + brandPerformance.avgLikesGrowth + "%",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {cards.map((card) => (
        <Card key={card.label} className="border-border/50 shadow-sm">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">{card.label}</p>
            <p className="text-xl font-semibold">{card.value}</p>
            <Badge
              variant="secondary"
              className="mt-1.5 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            >
              {card.change}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
