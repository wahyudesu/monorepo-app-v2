import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlatformIcon, type Platform } from "@/components/social/PlatformIcon";
import { type CalendarEvent } from "@/data/mock";

const statusBadgeStyles: Record<string, { bg: string; text: string }> = {
  published: { bg: "var(--badge-published)", text: "var(--badge-published-foreground)" },
  scheduled: { bg: "var(--badge-info)", text: "var(--badge-info-foreground)" },
  draft: { bg: "var(--badge-draft)", text: "var(--badge-draft-foreground)" },
  pending: { bg: "var(--badge-pending)", text: "var(--badge-pending-foreground)" },
};

interface EventDetailDialogProps {
  event: CalendarEvent | null;
  onClose: () => void;
}

export function EventDetailDialog({ event, onClose }: EventDetailDialogProps) {
  if (!event) return null;

  const badgeStyle = statusBadgeStyles[event.status] || statusBadgeStyles.draft;

  return (
    <Dialog open={!!event} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <PlatformIcon platform={event.platform as Platform} size={24} />
            <DialogTitle className="font-display">{event.title}</DialogTitle>
          </div>
          <DialogDescription className="sr-only">Event details</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="text-xs capitalize"
              style={{
                backgroundColor: badgeStyle.bg,
                color: badgeStyle.text,
              }}
            >
              {event.status}
            </Badge>
            <Badge variant="outline" className="text-xs capitalize">{event.type}</Badge>
          </div>
          {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📅 {event.date}</span>
            {event.time && <span>🕐 {event.time}</span>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Edit Draft</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
