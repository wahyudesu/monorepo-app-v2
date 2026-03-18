import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string | number;
  trend?: { value: string; direction: "up" | "down" | "neutral" };
  icon?: React.ReactNode;
}

export function SummaryCard({ title, value, trend, icon }: SummaryCardProps) {
  const badgeVariants = {
    up: "bg-success/10 text-success hover:bg-success/10",
    down: "bg-destructive/10 text-destructive hover:bg-destructive/10",
    neutral: "bg-muted/50 text-muted-foreground hover:bg-muted/50",
  };

  return (
    <div className="flex flex-col items-start text-left space-y-2 min-w-[100px]">
      {/* Title + small icon */}
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-sm">{icon}</span>}
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
      </div>

      {/* Large value */}
      <span className="text-xl font-bold font-display text-foreground">
        {typeof value === "number" && value > 1000 ? value.toLocaleString() : value}
      </span>

      {/* Percentage badge */}
      {trend && (
        <Badge variant="secondary" className={cn("text-xs font-medium px-2 py-0.5", badgeVariants[trend.direction])}>
          {trend.direction === "up" && "+"}{trend.value}
          {typeof trend.value === "number" || /^[0-9]+$/.test(trend.value) ? "%" : ""}
        </Badge>
      )}
    </div>
  );
}
