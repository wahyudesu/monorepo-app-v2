"use client";

import { useState } from "react";
import { Badge } from "@/components/reui/badge";
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
} from "@/components/reui/kanban";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlatformIcon } from "@/components/social/PlatformIcon";
import { Play, Plus, Calendar, Clock } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { DragDropVerticalIcon } from "@hugeicons/core-free-icons";
import { type CalendarEvent } from "@/data/mock";
import { cn } from "@/lib/utils";

interface KanbanViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onCreateClick: () => void;
}

const COLUMN_TITLES: Record<string, string> = {
  draft: "Draft",
  scheduled: "Scheduled",
  published: "Posted",
};

interface PostCardProps {
  event: CalendarEvent;
  asHandle?: boolean;
  isOverlay?: boolean;
  onClick?: () => void;
}

function PostCard({ event, asHandle, isOverlay, onClick }: PostCardProps) {
  const cardContent = (
    <Card className={cn("cursor-pointer transition-all hover:shadow-md", isOverlay && "shadow-2xl")} onClick={onClick}>
      <CardContent className="p-3">
        {event.thumbnail && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-3">
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
          </div>
        )}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <PlatformIcon platform={event.platform} size={14} />
            <span className="text-xs font-medium capitalize text-muted-foreground">
              {event.platform}
            </span>
          </div>
          <Badge
            variant={
              event.status === "published"
                ? "success-outline"
                : event.status === "scheduled"
                  ? "primary-outline"
                  : "warning-outline"
            }
            className="pointer-events-none h-5 rounded-sm px-1.5 text-[10px] capitalize"
          >
            {event.status}
          </Badge>
        </div>
        <h4 className="font-display text-sm font-semibold mb-2 line-clamp-2">{event.title}</h4>
        {event.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {event.description}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {event.date && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{event.date}</span>
            </div>
          )}
          {event.time && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{event.time}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
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
  return (
    <KanbanColumn value={value}>
      <Card className="h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold">
              {COLUMN_TITLES[value]}
            </span>
            <Badge variant="outline">{events.length}</Badge>
          </div>
          <KanbanColumnHandle
            render={(props) => (
              <Button {...props} size="icon-xs" variant="ghost">
                <HugeiconsIcon icon={DragDropVerticalIcon} strokeWidth={2} />
              </Button>
            )}
          />
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

export function KanbanView({ events, onEventClick, onCreateClick }: KanbanViewProps) {
  // Group events by status
  const groupedEvents = {
    draft: events.filter((e) => e.status === "draft"),
    scheduled: events.filter((e) => e.status === "scheduled"),
    published: events.filter((e) => e.status === "published"),
  };

  const [columns, setColumns] = useState(groupedEvents);

  return (
    <Kanban
      value={columns}
      onValueChange={setColumns}
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
