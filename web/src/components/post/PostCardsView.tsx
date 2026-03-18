import { LayoutGrid } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContentCard } from "@/components/post/ContentCard";
import { type CalendarEvent } from "@/data/mock";

interface PostCardsViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onCreateClick: () => void;
}

export function PostCardsView({ events, onEventClick, onCreateClick }: PostCardsViewProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <ContentCard key={event.id} event={event} onClick={() => onEventClick(event)} />
      ))}
      <Card
        className="border-border/50 border-dashed cursor-pointer transition-all hover:border-primary/50 hover:bg-muted/30"
        onClick={onCreateClick}
      >
        <CardContent className="flex h-full items-center justify-center p-4">
          <div className="text-center text-muted-foreground">
            <LayoutGrid className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <span className="text-sm font-medium">Create New Content</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
