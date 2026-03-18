import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string | number;
  trend?: { value: string | number; direction?: "up" | "down" | "neutral" };
  icon?: React.ReactNode;
}

export function SummaryCard({ title, value, trend, icon }: SummaryCardProps) {
  // Determine direction from value if not provided
  const getDirection = (): "up" | "down" | "neutral" => {
    if (trend?.direction) return trend.direction;
    
    const trendValue = typeof trend?.value === "string" ? trend.value : String(trend?.value ?? "0");
    const numValue = parseFloat(trendValue.replace(/[+%]/g, ""));
    
    if (isNaN(numValue) || numValue === 0) return "neutral";
    return numValue > 0 ? "up" : "down";
  };

  const direction = getDirection();

  const badgeVariants = {
    up: "bg-green-500/15 text-green-600 dark:text-green-400 hover:bg-green-500/15 border-green-500/20",
    down: "bg-red-500/15 text-red-600 dark:text-red-400 hover:bg-red-500/15 border-red-500/20",
    neutral: "bg-muted/50 text-muted-foreground hover:bg-muted/50",
  };

  return (
    <div className="flex flex-col items-start text-left space-y-2 min-w-[100px]">
      {/* Title + small icon */}
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-sm">{icon}</span>}
        <span className="text-xs font-medium text-muted-foreground">
          {title}
        </span>
      </div>

      {/* Large value */}
      <span className="text-xl font-bold font-display text-foreground ">
        {typeof value === "number" && value > 1000
          ? value.toLocaleString()
          : value}
      </span>

        {/* Percentage badge */}
        <Badge className={cn("text-xs", badgeVariants[direction])}>
          {trend?.value}
        </Badge>
    </div>
  );
}
