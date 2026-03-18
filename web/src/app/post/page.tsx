"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { calendarEvents, type CalendarEvent } from "@/data/mock";
import { CalendarGrid } from "@/components/post/CalendarGrid";
import {
    PostHeader,
    PostControls,
    PostCardsView,
    KanbanView,
    ListView,
    EventDetailDialog,
    CreateContentDialog,
  } from "@/components/post";
import { getDaysInMonth, getFirstDayOfMonth } from "@/lib/constants";
import { Platform } from "@/components/ui/PlatformIcon";

type ViewMode = "calendar" | "cards";
type CalendarView = "month" | "week";
type CardsView = "grid" | "kanban" | "list";

export default function PostPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [calendarView, setCalendarView] = useState<CalendarView>("month");
  const [cardsView, setCardsView] = useState<CardsView>("grid");
  // Use a fixed date for initial render to prevent hydration mismatch
  // The same date renders on server and client, then updates to real date on client
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date("2026-01-01T00:00:00"));

  useEffect(() => {
    // Update to actual date on client mount only (after hydration)
    setCurrentDate(new Date());
  }, []);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState(calendarEvents);
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedDateForCreate, setSelectedDateForCreate] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | "all">("all" as const);

  const openCreateDialog = (dateStr?: string) => {
    setSelectedDateForCreate(dateStr || null);
    setIsCreateDialogOpen(true);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  // Calculate week range for week view
  const getWeekRange = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
    const startOfWeek = new Date(d.setDate(diff));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    return { startOfWeek, endOfWeek };
  };

  const weekRange = useMemo(() => getWeekRange(currentDate), [currentDate]);
  const weekName = `${weekRange.startOfWeek.toLocaleDateString("default", { month: "short", day: "numeric" })} - ${weekRange.endOfWeek.toLocaleDateString("default", { month: "short", day: "numeric", year: "numeric" })}`;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const prevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handlePrev = calendarView === "week" ? prevWeek : prevMonth;
  const handleNext = calendarView === "week" ? nextWeek : nextMonth;
  const displayName = calendarView === "week" ? weekName : monthName;

const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    const filtered = selectedPlatform === "all" 
      ? events 
      : events.filter((e) => e.platform === selectedPlatform);
    filtered.forEach((e) => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, [events, selectedPlatform]);

      const filteredEvents = useMemo(() => {
        return selectedPlatform === "all" 
          ? events 
          : events.filter((e) => e.platform === selectedPlatform);
      }, [events, selectedPlatform]);

  const handleDragStart = useCallback((e: React.DragEvent, event: CalendarEvent) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = "move";
    if (e.currentTarget instanceof HTMLElement) e.currentTarget.style.opacity = "0.5";
  }, []);

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    if (e.currentTarget instanceof HTMLElement) e.currentTarget.style.opacity = "1";
    setDraggedEvent(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetDate: string) => {
      e.preventDefault();
      if (!draggedEvent) return;
      setEvents((prev) => prev.map((ev) => (ev.id === draggedEvent.id ? { ...ev, date: targetDate } : ev)));
      setDraggedEvent(null);
    },
    [draggedEvent]
  );

  const today = currentDate;
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Calculate cells based on calendar view
  const cells: { day: number | null; dateStr: string }[] = useMemo(() => {
    if (calendarView === "month") {
      const monthCells: { day: number | null; dateStr: string }[] = [];
      for (let i = 0; i < firstDay; i++) monthCells.push({ day: null, dateStr: "" });
      for (let d = 1; d <= daysInMonth; d++) {
        monthCells.push({ day: d, dateStr: `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}` });
      }
      while (monthCells.length % 7 !== 0) monthCells.push({ day: null, dateStr: "" });
      return monthCells;
    } else {
      // Week view - show 7 days of the current week
      const weekCells: { day: number | null; dateStr: string }[] = [];
      const startOfWeek = weekRange.startOfWeek;
      for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        weekCells.push({
          day: d.getDate(),
          dateStr: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
        });
      }
      return weekCells;
    }
  }, [calendarView, firstDay, daysInMonth, year, month, weekRange]);

  return (
      <div className="mx-auto max-w-6xl space-y-6">
        <PostHeader />

            <PostControls
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              monthName={displayName}
              onPrevMonth={handlePrev}
              onNextMonth={handleNext}
              calendarView={calendarView}
              onCalendarViewChange={setCalendarView}
              cardsView={cardsView}
              onCardsViewChange={setCardsView}
              selectedPlatform={selectedPlatform}
              onPlatformChange={setSelectedPlatform}
            />

        {viewMode === "calendar" && (
          <CalendarGrid
            cells={cells}
            eventsByDate={eventsByDate}
            todayStr={todayStr}
            draggedEvent={draggedEvent}
            onDateClick={openCreateDialog}
            onEventClick={setSelectedEvent}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            calendarView={calendarView}
          />
        )}

        {viewMode === "cards" && cardsView === "grid" && (
          <PostCardsView
            events={filteredEvents}
            onEventClick={setSelectedEvent}
            onCreateClick={() => openCreateDialog()}
          />
        )}

          {viewMode === "cards" && cardsView === "kanban" && (
            <KanbanView
              events={filteredEvents}
              onEventClick={setSelectedEvent}
              onCreateClick={() => openCreateDialog()}
              onEventsChange={setEvents}
            />
          )}

          {viewMode === "cards" && cardsView === "list" && (
            <ListView
              events={filteredEvents}
              onEventClick={setSelectedEvent}
            />
          )}

        <EventDetailDialog
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />

        <CreateContentDialog
          open={isCreateDialogOpen}
          onOpenChange={(open) => {
            setIsCreateDialogOpen(open);
            if (!open) setSelectedDateForCreate(null);
          }}
          selectedDate={selectedDateForCreate}
        />
      </div>
    );
  }
