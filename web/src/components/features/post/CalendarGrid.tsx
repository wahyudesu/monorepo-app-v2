import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DAY_NAMES, type Platform } from "@/lib/constants";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { ContentCard } from "@/components/features/post/ContentCard";
import { type CalendarEvent } from "@/data/mock";

type CalendarView = "month" | "week";

interface CalendarGridProps {
  cells: { day: number | null; dateStr: string }[];
  eventsByDate: Record<string, CalendarEvent[]>;
  todayStr: string;
  draggedEvent: CalendarEvent | null;
  onDateClick: (dateStr: string) => void;
  onEventClick: (event: CalendarEvent) => void;
  onDragStart: (e: React.DragEvent, event: CalendarEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, dateStr: string) => void;
  calendarView?: CalendarView;
}

export function CalendarGrid({
  cells,
  eventsByDate,
  todayStr,
  draggedEvent,
  onDateClick,
  onEventClick,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  calendarView = "month",
}: CalendarGridProps) {
  // Generate hours for week view time column
  const hours = Array.from({ length: 24 }, (_, i) => i);

  if (calendarView === "week") {
    // Week view with card-based design (same as kanban)
    return (
      <Card className="border-border/50 overflow-hidden">
        {/* Header row with day names */}
        <div className="grid grid-cols-7 border-b border-border/50">
          {DAY_NAMES.map((d) => (
            <div
              key={d}
              className="px-3 py-3 text-center text-sm font-medium text-muted-foreground"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Days columns */}
        <div className="grid grid-cols-7">
          {cells.map((cell, cellIndex) => {
            const dayEvents = cell.dateStr ? eventsByDate[cell.dateStr] || [] : [];
            const isToday = cell.dateStr === todayStr;

            return (
              <div
                key={cellIndex}
                className={cn(
                  "border-r border-border/30 flex flex-col min-h-[600px]",
                  cell.day ? "bg-card" : "bg-muted/20"
                )}
              >
                {/* Date header */}
                <div className="border-b border-border/30 p-3 text-center sticky top-0 bg-card/95 backdrop-blur-sm z-10">
                  {cell.day && (
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
                        isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                      )}
                    >
                      {cell.day}
                    </span>
                  )}
                </div>

                {/* Event cards */}
                  <div className="flex-1 p-2 space-y-2">
                    {dayEvents.map((ev) => (
                      <ContentCard
                        key={ev.id}
                        event={ev}
                        variant="vertical"
                        size="sm"
                        draggable
                        onDragStart={(e) => onDragStart(e, ev)}
                        onDragEnd={onDragEnd}
                        onClick={() => onEventClick(ev)}
                      />
                    ))}

                    {/* Empty slot indicator for creating new events */}
                    {cell.day && (
                      <button
                        onClick={() => onDateClick(cell.dateStr)}
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, cell.dateStr)}
                        className="w-full p-3 border-2 border-dashed border-border/30 rounded-lg flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:bg-muted/30 transition-all"
                      >
                        <span className="text-xs">+</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
    );
  }

  // Month view (original)
  return (
    <Card className="border-border/50 overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-border/50">
        {DAY_NAMES.map((d) => (
          <div
            key={d}
            className="px-3 py-3 text-center text-sm font-medium text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7">
        {cells.map((cell, i) => {
          const dayEvents = cell.dateStr ? eventsByDate[cell.dateStr] || [] : [];
          const isToday = cell.dateStr === todayStr;

          return (
            <div
              key={i}
              className={cn(
                "min-h-[240px] border-b border-r border-border/30 p-2 transition-colors",
                cell.day ? "bg-card hover:bg-muted/30 cursor-pointer" : "bg-muted/20",
                draggedEvent && cell.day ? "hover:bg-primary/5" : ""
              )}
              onClick={cell.day ? () => onDateClick(cell.dateStr) : undefined}
              onDragOver={cell.day ? onDragOver : undefined}
              onDrop={cell.day ? (e) => onDrop(e, cell.dateStr) : undefined}
            >
              {cell.day && (
                <>
                  <span
                    className={cn(
                      "mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                      isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                    )}
                  >
                    {cell.day}
                  </span>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 4).map((ev) => (
                      <div
                        key={ev.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, ev)}
                        onDragEnd={onDragEnd}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(ev);
                        }}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors hover:opacity-80"
                        style={{
                          backgroundColor: `hsl(${ev.color} / 0.15)`,
                          color: `hsl(${ev.color})`,
                        }}
                      >
                        <span className="shrink-0 flex items-center">
                          <PlatformIcon platform={ev.platform as Platform} size={20} />
                        </span>
                        <span className="truncate">{ev.title}</span>
                      </div>
                    ))}
                    {dayEvents.length > 4 && (
                      <p className="px-2 text-xs text-muted-foreground">
                        +{dayEvents.length - 4} more
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
