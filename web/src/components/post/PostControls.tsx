import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ViewMode = "calendar" | "cards";
type CalendarView = "month" | "week";

interface PostControlsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  monthName: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  calendarView?: CalendarView;
  onCalendarViewChange?: (view: CalendarView) => void;
}

export function PostControls({
  viewMode,
  onViewModeChange,
  monthName,
  onPrevMonth,
  onNextMonth,
  calendarView = "month",
  onCalendarViewChange,
}: PostControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        {/* View Mode Toggle */}
        <div className="flex items-center rounded-lg border border-border/50 bg-card/50 p-1">
          <Button
            variant={viewMode === "calendar" ? "secondary" : "ghost"}
            size="sm"
            className="h-7 px-3 text-xs font-medium"
            onClick={() => onViewModeChange("calendar")}
          >
            <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
            Calendar
          </Button>
          <Button
            variant={viewMode === "cards" ? "secondary" : "ghost"}
            size="sm"
            className="h-7 px-3 text-xs font-medium"
            onClick={() => onViewModeChange("cards")}
          >
            <LayoutGrid className="mr-1.5 h-3.5 w-3.5" />
            Cards
          </Button>
        </div>

        {/* Month/Week Toggle - Text Labels */}
        {viewMode === "calendar" && onCalendarViewChange && (
          <div className="flex items-center rounded-lg border border-border/50 bg-card/50 p-1">
            <Button
              variant={calendarView === "month" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 px-3 text-xs font-medium"
              onClick={() => onCalendarViewChange("month")}
            >
              Month
            </Button>
            <Button
              variant={calendarView === "week" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 px-3 text-xs font-medium"
              onClick={() => onCalendarViewChange("week")}
            >
              Week
            </Button>
          </div>
        )}
      </div>

      {viewMode === "calendar" && (
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onPrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-[140px] text-center font-display text-sm font-semibold">{monthName}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
