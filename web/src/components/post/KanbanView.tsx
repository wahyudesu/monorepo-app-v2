import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContentCard } from "@/components/content/ContentCard";
import { Badge } from "@/components/ui/badge";
import { type CalendarEvent } from "@/data/mock";
import { cn } from "@/lib/utils";

interface KanbanViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onCreateClick: () => void;
}

const columns = [
  { id: "draft", label: "Draft", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  { id: "scheduled", label: "Scheduled", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  { id: "published", label: "Posted", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
] as const;

export function KanbanView({ events, onEventClick, onCreateClick }: KanbanViewProps) {
  const eventsByStatus = {
    draft: events.filter((e) => e.status === "draft"),
    scheduled: events.filter((e) => e.status === "scheduled"),
    published: events.filter((e) => e.status === "published"),
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => (
        <div key={column.id} className="flex min-w-[300px] flex-1 flex-col gap-3">
          {/* Column Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold">{column.label}</h3>
              <Badge variant="outline" className="text-xs">
                {eventsByStatus[column.id].length}
              </Badge>
            </div>
          </div>

          {/* Column Content */}
          <div className="flex flex-1 flex-col gap-3">
            {eventsByStatus[column.id].map((event) => (
              <div
                key={event.id}
                onClick={() => onEventClick(event)}
                className="cursor-pointer"
              >
                <ContentCard event={event} onClick={() => onEventClick(event)} />
              </div>
            ))}

            {/* Add New Card */}
            {column.id === "draft" && (
              <Card
                className="border-border/50 border-dashed cursor-pointer transition-all hover:border-primary/50 hover:bg-muted/30"
                onClick={onCreateClick}
              >
                <CardContent className="flex h-full items-center justify-center p-4">
                  <div className="text-center text-muted-foreground">
                    <Plus className="mx-auto h-6 w-6 mb-1 opacity-50" />
                    <span className="text-xs font-medium">Create New</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
