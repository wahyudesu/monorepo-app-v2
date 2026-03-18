"use client";

import { useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { calendarEvents, type CalendarEvent } from "@/data/mock";
import { cn } from "@/lib/utils";
import { getDaysInMonth, getFirstDayOfMonth } from "@/lib/constants";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { ContentCard } from "@/components/content/ContentCard";

type ViewMode = "calendar" | "cards";

export default function PostPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState(calendarEvents);
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedDateForCreate, setSelectedDateForCreate] = useState<string | null>(null);

  const openCreateDialog = (dateStr?: string) => {
    setSelectedDateForCreate(dateStr || null);
    setIsCreateDialogOpen(true);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((e) => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, [events]);

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

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const cells: { day: number | null; dateStr: string }[] = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: null, dateStr: "" });
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, dateStr: `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}` });
  }
  while (cells.length % 7 !== 0) cells.push({ day: null, dateStr: "" });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Posts</h1>
        <p className="text-sm text-muted-foreground">Content schedule & planning</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border/50 bg-card/50 p-1">
            <Button variant={viewMode === "calendar" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("calendar")} className="h-8 w-8">
              <CalendarIcon className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "cards" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("cards")} className="h-8 w-8">
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {viewMode === "calendar" && (
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[140px] text-center font-display text-sm font-semibold">{monthName}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Calendar View */}
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
        />
      )}

      {/* Cards View */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <ContentCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
          ))}
          <Card
            className="border-border/50 border-dashed cursor-pointer transition-all hover:border-primary/50 hover:bg-muted/30"
            onClick={() => openCreateDialog()}
          >
            <CardContent className="flex h-full items-center justify-center p-4">
              <div className="text-center text-muted-foreground">
                <LayoutGrid className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <span className="text-sm font-medium">Create New Content</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <span className="text-lg">📸</span>
                  <DialogTitle className="font-display">{selectedEvent.title}</DialogTitle>
                </div>
                <DialogDescription className="sr-only">Event details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs capitalize">{selectedEvent.status}</Badge>
                  <Badge variant="outline" className="text-xs capitalize">{selectedEvent.type}</Badge>
                </div>
                {selectedEvent.description && <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>📅 {selectedEvent.date}</span>
                  {selectedEvent.time && <span>🕐 {selectedEvent.time}</span>}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>Close</Button>
                <Button>Edit Draft</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Content Draft</DialogTitle>
            {selectedDateForCreate && <p className="text-sm text-muted-foreground">for {selectedDateForCreate}</p>}
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input placeholder="Enter content title..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="What's this content about?" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="instagram">📸 Instagram</option>
                  <option value="tiktok">🎵 TikTok</option>
                  <option value="twitter">𝕏 Twitter</option>
                  <option value="youtube">▶️ YouTube</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="post">📝 Post</option>
                  <option value="reel">🎬 Reel</option>
                  <option value="story">📸 Story</option>
                  <option value="video">🎥 Video</option>
                  <option value="tweet">🐦 Tweet</option>
                  <option value="live">🔴 Live</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" defaultValue={selectedDateForCreate || undefined} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input type="time" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsCreateDialogOpen(false); setSelectedDateForCreate(null); }}>Cancel</Button>
            <Button onClick={() => { setIsCreateDialogOpen(false); setSelectedDateForCreate(null); }}>Create Draft</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
