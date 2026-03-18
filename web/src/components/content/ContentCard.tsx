import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { platformColors, type Platform } from "@/lib/constants";
import { PlatformIcon } from "@/components/social/PlatformIcon";
import { type CalendarEvent } from "@/data/mock";

const statusBadgeStyles: Record<string, { bg: string; text: string }> = {
  published: { bg: "var(--badge-published)", text: "var(--badge-published-foreground)" },
  scheduled: { bg: "var(--badge-info)", text: "var(--badge-info-foreground)" },
  draft: { bg: "var(--badge-draft)", text: "var(--badge-draft-foreground)" },
  pending: { bg: "var(--badge-pending)", text: "var(--badge-pending-foreground)" },
};

interface ContentCardProps {
  event: CalendarEvent;
  onClick?: () => void;
}

export function ContentCard({ event, onClick }: ContentCardProps) {
    const badgeStyle = statusBadgeStyles[event.status] || statusBadgeStyles.draft;
  
    return (
      <Card
        className={cn(
          "cursor-pointer transition-all hover:shadow-md hover:border-primary/50",
          platformColors[event.platform as Platform]?.split(" ").slice(0, 2).join(" "),
          event.thumbnail && "pt-0"
        )}
        onClick={onClick}
      >
        {event.thumbnail && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
            <img
              src={event.thumbnail}
              alt={event.title}
              className="h-full w-full object-cover"
            />
            {event.mediaType === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
                  <Play className="h-5 w-5 text-gray-900 fill-gray-900" />
                </div>
              </div>
            )}
          </div>
        )}
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <PlatformIcon platform={event.platform as Platform} size={18} />
              <span className="text-xs font-medium capitalize text-muted-foreground">
                {event.platform}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="text-[10px] capitalize"
              style={{
                backgroundColor: badgeStyle.bg,
                color: badgeStyle.text,
              }}
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
