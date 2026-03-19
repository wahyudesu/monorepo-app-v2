"use client";

import { useState } from "react";
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
} from "@/components/ui/reui-kanban";
import { Card, CardContent } from "@/components/ui/card";
import { ContentCard } from "@/components/features/post/ContentCard";
import { Plus } from "lucide-react";
import { type CalendarEvent } from "@/data/mock";
import { cn } from "@/lib/utils";

interface KanbanViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onCreateClick: () => void;
  onEventsChange?: (events: CalendarEvent[]) => void;
}

const COLUMN_CONFIG: Record<string, { title: string; colorClass: string; badgeClass: string }> = {
  draft: {
    title: "Draft",
    colorClass: "bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700",
    badgeClass: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  },
  scheduled: {
    title: "Scheduled",
    colorClass: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    badgeClass: "bg-yellow-200 text-yellow-800 dark:bg-yellow-800/50 dark:text-yellow-200",
  },
  published: {
    title: "Posted",
    colorClass: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    badgeClass: "bg-green-200 text-green-800 dark:bg-green-800/50 dark:text-green-200",
  },
};

interface PostCardProps {
  event: CalendarEvent;
  asHandle?: boolean;
  isOverlay?: boolean;
  onClick?: () => void;
}

function PostCard({ event, asHandle, isOverlay, onClick }: PostCardProps) {
  const cardContent = (
    <ContentCard
      event={event}
      variant="vertical"
      onClick={onClick}
      className={cn(isOverlay && "shadow-2xl")}
    />
  );

  return (
    <KanbanItem value={event.id}>
      {asHandle && !isOverlay ? (
        <KanbanItemHandle>{cardContent}</KanbanItemHandle>
      ) : (
        cardContent
      )}
    </KanbanItem>
  );
}

interface PostColumnProps {
  value: string;
  events: CalendarEvent[];
  isOverlay?: boolean;
  onEventClick: (event: CalendarEvent) => void;
  onCreateClick?: () => void;
}

function PostColumn({ value, events, isOverlay, onEventClick, onCreateClick }: PostColumnProps) {
  const config = COLUMN_CONFIG[value];

  return (
    <KanbanColumn value={value}>
      <Card className="h-full">
        <div className={cn("flex items-center p-4 border-b", config.colorClass)}>
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold">{config.title}</span>
            <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", config.badgeClass)}>
              {events.length}
            </span>
          </div>
        </div>
        <CardContent className="p-3">
          <KanbanColumnContent value={value} className="flex flex-col gap-3 min-h-[200px]">
            {events.map((event) => (
              <PostCard
                key={event.id}
                event={event}
                asHandle={!isOverlay}
                onClick={() => onEventClick(event)}
              />
            ))}
            {value === "draft" && onCreateClick && (
              <button
                onClick={onCreateClick}
                className="w-full p-4 border-2 border-dashed border-border/50 rounded-lg flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:bg-muted/30 transition-all"
              >
                <div className="text-center">
                  <Plus className="h-5 w-5 mx-auto mb-1 opacity-50" />
                  <span className="text-xs font-medium">Create New</span>
                </div>
              </button>
            )}
          </KanbanColumnContent>
        </CardContent>
      </Card>
    </KanbanColumn>
  );
}

export function KanbanView({ events, onEventClick, onCreateClick, onEventsChange }: KanbanViewProps) {
  // Group events by status
  const groupedEvents = {
    draft: events.filter((e) => e.status === "draft"),
    scheduled: events.filter((e) => e.status === "scheduled"),
    published: events.filter((e) => e.status === "published"),
  };

  const [columns, setColumns] = useState(groupedEvents);

  // Handle drag end - update event statuses based on their new column
  const handleValueChange = (newColumns: typeof groupedEvents) => {
    setColumns(newColumns);

    // Update event statuses when moved between columns
    if (onEventsChange) {
      const updatedEvents: CalendarEvent[] = [];

      // Update events based on their new column
      Object.entries(newColumns).forEach(([status, events]) => {
        events.forEach((event) => {
          updatedEvents.push({
            ...event,
            status: status as CalendarEvent["status"],
          });
        });
      });

      onEventsChange(updatedEvents);
    }
  };

  return (
    <Kanban
      value={columns}
      onValueChange={handleValueChange}
      getItemValue={(item) => item.id}
    >
      <KanbanBoard className="grid auto-rows-fr grid-cols-3 gap-4">
        <PostColumn value="draft" events={columns.draft} onEventClick={onEventClick} onCreateClick={onCreateClick} />
        <PostColumn value="scheduled" events={columns.scheduled} onEventClick={onEventClick} />
        <PostColumn value="published" events={columns.published} onEventClick={onEventClick} />
      </KanbanBoard>
      <KanbanOverlay>
        {({ value, variant }) => {
          if (variant === "column") {
            const events = columns[value as keyof typeof columns] ?? [];
            return (
              <PostColumn
                value={String(value)}
                events={events}
                isOverlay
                onEventClick={onEventClick}
                onCreateClick={onCreateClick}
              />
            );
          }

          const event = Object.values(columns)
            .flat()
            .find((item) => item.id === value);

          if (!event) return null;

          return <PostCard event={event} isOverlay onClick={() => onEventClick(event)} />;
        }}
      </KanbanOverlay>
    </Kanban>
  );
}
