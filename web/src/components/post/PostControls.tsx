"use client";

import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, LayoutGrid, CalendarDays, CalendarRange, Filter, Check, KanbanSquare, List, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { PlatformIcon, Platform } from "@/components/ui/PlatformIcon";

type ViewMode = "calendar" | "cards";
type CalendarView = "month" | "week";
type CardsView = "grid" | "kanban" | "list";

const platforms: { value: Platform | "all"; label: string }[] = [
  { value: "all", label: "All Platforms" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "X / Twitter" },
  { value: "youtube", label: "YouTube" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "pinterest", label: "Pinterest" },
  { value: "threads", label: "Threads" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "reddit", label: "Reddit" },
  { value: "bluesky", label: "Bluesky" },
  { value: "telegram", label: "Telegram" },
  { value: "snapchat", label: "Snapchat" },
];

interface PostControlsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  monthName: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  calendarView?: CalendarView;
  onCalendarViewChange?: (view: CalendarView) => void;
  cardsView?: CardsView;
  onCardsViewChange?: (view: CardsView) => void;
  selectedPlatform?: Platform | "all";
  onPlatformChange?: (platform: Platform | "all") => void;
}

export function PostControls({
  viewMode,
  onViewModeChange,
  monthName,
  onPrevMonth,
  onNextMonth,
  calendarView = "month",
  onCalendarViewChange,
  cardsView = "grid",
  onCardsViewChange,
  selectedPlatform = "all",
  onPlatformChange,
}: PostControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
          {/* View Mode Toggle - Icons Only with Tooltip (SWAPPED - now first) */}
          <div className="flex items-center rounded-lg border border-border/50 bg-card/50 p-1">
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant={viewMode === "calendar" ? "default" : "ghost"}
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => onViewModeChange("calendar")}
                >
                  <CalendarIcon className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Calendar View</TooltipContent>
            </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={viewMode === "cards" ? "default" : "ghost"}
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => onViewModeChange("cards")}
                  >
                    <Newspaper className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Post View</TooltipContent>
              </Tooltip>
          </div>

          {/* Month/Week Toggle for Calendar - Text Labels */}
          {viewMode === "calendar" && onCalendarViewChange && (
            <div className="flex items-center rounded-lg border border-border/50 bg-card/50 p-1">
              <Button
                variant={calendarView === "month" ? "default" : "ghost"}
                size="sm"
                className="h-7 px-3 text-xs font-medium"
                onClick={() => onCalendarViewChange("month")}
              >
                <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                Month
              </Button>
              <Button
                variant={calendarView === "week" ? "default" : "ghost"}
                size="sm"
                className="h-7 px-3 text-xs font-medium"
                onClick={() => onCalendarViewChange("week")}
              >
                <CalendarRange className="mr-1.5 h-3.5 w-3.5" />
                Week
              </Button>
            </div>
          )}

            {/* Grid/Kanban/List Toggle for Cards View */}
            {viewMode === "cards" && onCardsViewChange && (
              <div className="flex items-center rounded-lg border border-border/50 bg-card/50 p-1">
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={cardsView === "grid" ? "default" : "ghost"}
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => onCardsViewChange("grid")}
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Grid View</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={cardsView === "kanban" ? "default" : "ghost"}
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => onCardsViewChange("kanban")}
                    >
                      <KanbanSquare className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Kanban View</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={cardsView === "list" ? "default" : "ghost"}
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => onCardsViewChange("list")}
                    >
                      <List className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">List View</TooltipContent>
                </Tooltip>
              </div>
            )}

              {/* Platform Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" size="sm" className="h-7 gap-1.5 px-3 text-xs font-medium">
                    <Filter className="h-3.5 w-3.5" />
                    {selectedPlatform === "all" ? (
                      "All Platforms"
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <PlatformIcon platform={selectedPlatform} size={18} />
                        {platforms.find(p => p.value === selectedPlatform)?.label}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {platforms.map((platform) => (
                    <DropdownMenuItem
                      key={platform.value}
                      onClick={() => onPlatformChange?.(platform.value)}
                      className="flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        {platform.value !== "all" && (
                          <PlatformIcon platform={platform.value} size={20} />
                        )}
                        <span>{platform.label}</span>
                      </span>
                      {selectedPlatform === platform.value && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
