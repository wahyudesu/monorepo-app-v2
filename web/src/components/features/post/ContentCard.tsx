import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Platform } from "@/lib/constants";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
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
  /** Card variant: vertical (thumbnail top) or compact (thumbnail left) */
  variant?: "vertical" | "compact";
  /** Show date and time info */
  showDateTime?: boolean;
  /** Size variant */
  size?: "default" | "sm";
  /** Additional card class name */
  className?: string;
  /** Draggable */
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

export function ContentCard({
  event,
  onClick,
  variant = "vertical",
  showDateTime = true,
  size = "default",
  className,
  draggable,
  onDragStart,
  onDragEnd,
}: ContentCardProps) {
  const badgeStyle = statusBadgeStyles[event.status] || statusBadgeStyles.draft;
  const platforms = event.platforms || [event.platform];
  const isCompact = variant === "compact";
  const isSm = size === "sm";

  return (
    <Card
        className={cn(
          "group/card cursor-pointer transition-all hover:shadow-md overflow-hidden",
          isSm && "text-xs",
          className
        )}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {isCompact ? (
        // Compact layout - thumbnail on left, content on right
        <div className="flex gap-3 p-3">
          {event.thumbnail && (
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={event.thumbnail}
                alt={event.title}
                className="h-full w-full object-cover"
              />
              {event.mediaType === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="h-4 w-4 text-white fill-white" />
                </div>
              )}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1.5">
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
              <div className="flex items-center gap-0.5 -space-x-1">
                {platforms.map((platform) => (
                  <div
                    key={platform}
                    className="relative rounded-full bg-muted/50 p-0.5"
                  >
                    <PlatformIcon platform={platform as Platform} size={16} />
                  </div>
                ))}
              </div>
            </div>
            <h3 className="font-display font-semibold text-sm mb-0.5 truncate">{event.title}</h3>
            {event.description && (
              <p className="text-xs text-muted-foreground line-clamp-1 mb-1.5">
                {event.description}
              </p>
            )}
            {showDateTime && (
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="capitalize">{event.type}</span>
                <span>{event.date}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Vertical layout - thumbnail on top, content below
        <>
          {event.thumbnail && (
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={event.thumbnail}
                alt={event.title}
                className="h-full w-full object-cover"
              />
              {event.mediaType === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
                    <Play className="h-4 w-4 text-gray-900 fill-gray-900" />
                  </div>
                </div>
              )}
              {/* Platform icons overlay in top right */}
              <div className="absolute top-2 right-2 flex items-center gap-0.5">
                {platforms.map((platform) => (
                  <div
                    key={platform}
                    className="rounded-full bg-white/90 p-1 shadow-sm backdrop-blur-sm"
                  >
                    <PlatformIcon platform={platform as Platform} size={14} />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={cn("p-3", isSm && "p-2.5")}>
            <div className="flex items-center justify-between mb-1.5">
              <Badge
                variant="secondary"
                className={cn(
                  "text-[10px] capitalize pointer-events-none",
                  isSm && "h-5 rounded-sm px-1.5"
                )}
                style={{
                  backgroundColor: badgeStyle.bg,
                  color: badgeStyle.text,
                }}
              >
                {event.status}
              </Badge>
            </div>
            <h4 className={cn(
              "font-display font-semibold mb-1 line-clamp-2",
              isSm ? "text-xs" : "text-sm"
            )}>
              {event.title}
            </h4>
            {event.description && !isSm && (
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {event.description}
              </p>
            )}
            {showDateTime && (
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
