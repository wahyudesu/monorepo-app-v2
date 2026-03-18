import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, LayoutGrid, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
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
      <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border/50 bg-card/50 p-1">
            <Tooltip>
              <TooltipTrigger
                onClick={() => onViewModeChange("calendar")}
                className={cn(
                  buttonVariants({ variant: viewMode === "calendar" ? "secondary" : "ghost", size: "icon" }),
                  "h-8 w-8"
                )}
              >
                <CalendarIcon className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>Calendar View</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                onClick={() => onViewModeChange("cards")}
                className={cn(
                  buttonVariants({ variant: viewMode === "cards" ? "secondary" : "ghost", size: "icon" }),
                  "h-8 w-8"
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>Card View</TooltipContent>
            </Tooltip>
          </div>
      </div>

      {viewMode === "calendar" && (
        <div className="flex items-center gap-3">
          {/* Month/Week Toggle */}
          {onCalendarViewChange && (
            <div className="flex items-center rounded-lg border border-border/50 bg-card/50 p-1">
              <Tooltip>
                <TooltipTrigger
                  onClick={() => onCalendarViewChange("month")}
                  className={cn(
                    buttonVariants({ variant: calendarView === "month" ? "secondary" : "ghost", size: "icon" }),
                    "h-7 w-7"
                  )}
                >
                  <CalendarIcon className="h-3.5 w-3.5" />
                </TooltipTrigger>
                <TooltipContent>Month View</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  onClick={() => onCalendarViewChange("week")}
                  className={cn(
                    buttonVariants({ variant: calendarView === "week" ? "secondary" : "ghost", size: "icon" }),
                    "h-7 w-7"
                  )}
                >
                  <CalendarDays className="h-3.5 w-3.5" />
                </TooltipTrigger>
                <TooltipContent>Week View</TooltipContent>
              </Tooltip>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onPrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[140px] text-center font-display text-sm font-semibold">{monthName}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
