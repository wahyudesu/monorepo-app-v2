import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { platformIcons, statusStyles, platformColors } from "@/lib/constants";
import { type CalendarEvent, type Platform } from "@/data/mock";

interface ContentCardProps {
  event: CalendarEvent;
  onClick?: () => void;
}

export function ContentCard({ event, onClick }: ContentCardProps) {
  return (
    <Card
      className={cn(
        "border-border/50 cursor-pointer transition-all hover:shadow-md hover:border-primary/50",
        platformColors[event.platform as Platform]?.split(" ").slice(0, 2).join(" ")
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{platformIcons[event.platform]}</span>
            <span className="text-xs font-medium capitalize text-muted-foreground">
              {event.platform}
            </span>
          </div>
          <Badge
            variant="secondary"
            className={cn("text-[10px] capitalize", statusStyles[event.status])}
          >
            {event.status}
          </Badge>
        </div>
        <h3 className="font-display font-semibold mb-1">{event.title}</h3>
        {event.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {event.description}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="capitalize">{event.type}</span>
          <span>{event.date}</span>
        </div>
      </CardContent>
    </Card>
  );
}
