import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DAY_NAMES, type Platform } from "@/lib/constants";
import { PlatformIcon } from "@/components/social/PlatformIcon";
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
    // Week view with time column
    return (
      <Card className="border-border/50 overflow-hidden">
        {/* Header row with time spacer + day names */}
        <div className="grid grid-cols-8 border-b border-border/50">
          <div className="w-16 border-r border-border/30" />
          {DAY_NAMES.map((d) => (
            <div
              key={d}
              className="px-2 py-2 text-center text-xs font-medium text-muted-foreground"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Time column + days columns */}
        <div className="flex">
          {/* Time column */}
          <div className="w-16 border-r border-border/30 flex-shrink-0">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-16 border-b border-border/20 pr-2 text-right"
              >
                <span className="text-[10px] text-muted-foreground">
                  {String(hour).padStart(2, "0")}:00
                </span>
              </div>
            ))}
          </div>

          {/* Days columns */}
          <div className="grid grid-cols-7 flex-1">
            {cells.map((cell, cellIndex) => {
              const dayEvents = cell.dateStr ? eventsByDate[cell.dateStr] || [] : [];
              const isToday = cell.dateStr === todayStr;

              return (
                <div
                  key={cellIndex}
                  className={cn(
                    "border-r border-border/30 flex flex-col",
                    cell.day ? "bg-card" : "bg-muted/20"
                  )}
                >
                  {/* Date header */}
                  <div className="border-b border-border/30 p-1 text-center">
                    {cell.day && (
                      <span
                        className={cn(
                          "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                          isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                        )}
                      >
                        {cell.day}
                      </span>
                    )}
                  </div>

                  {/* Time slots */}
                  {hours.map((hour) => {
                    const hourEvents = dayEvents.filter((ev) => {
                      const eventHour = parseInt(ev.time?.split(":")[0] || "0");
                      return eventHour === hour;
                    });

                    return (
                      <div
                        key={hour}
                        className={cn(
                          "h-16 border-b border-border/20 p-0.5 transition-colors",
                          cell.day ? "hover:bg-muted/30 cursor-pointer" : "",
                          draggedEvent && cell.day ? "hover:bg-primary/5" : ""
                        )}
                        onClick={cell.day ? () => onDateClick(cell.dateStr) : undefined}
                        onDragOver={cell.day ? onDragOver : undefined}
                        onDrop={cell.day ? (e) => onDrop(e, cell.dateStr) : undefined}
                      >
                        {hourEvents.map((ev) => (
                          <div
                            key={ev.id}
                            draggable
                            onDragStart={(e) => onDragStart(e, ev)}
                            onDragEnd={onDragEnd}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick(ev);
                            }}
                            className="mb-0.5 flex cursor-pointer items-center gap-1 rounded px-1 py-0.5 text-[10px] font-medium transition-colors hover:opacity-80"
                            style={{
                              backgroundColor: `hsl(${ev.color} / 0.15)`,
                              color: `hsl(${ev.color})`,
                            }}
                          >
                            <span className="shrink-0 flex items-center">
                              <PlatformIcon platform={ev.platform as Platform} size={12} />
                            </span>
                            <span className="truncate">{ev.title}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
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
            className="px-2 py-2 text-center text-xs font-medium text-muted-foreground"
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
                "min-h-[100px] border-b border-r border-border/30 p-1 transition-colors",
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
                      "mb-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                      isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                    )}
                  >
                    {cell.day}
                  </span>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 3).map((ev) => (
                      <div
                        key={ev.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, ev)}
                        onDragEnd={onDragEnd}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(ev);
                        }}
                        className="flex cursor-pointer items-center gap-1 rounded px-1 py-0.5 text-[10px] font-medium transition-colors hover:opacity-80"
                        style={{
                          backgroundColor: `hsl(${ev.color} / 0.15)`,
                          color: `hsl(${ev.color})`,
                        }}
                      >
                        <span className="shrink-0 flex items-center">
                          <PlatformIcon platform={ev.platform as Platform} size={12} />
                        </span>
                        <span className="truncate">{ev.title}</span>
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <p className="px-1 text-[10px] text-muted-foreground">
                        +{dayEvents.length - 3} more
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
