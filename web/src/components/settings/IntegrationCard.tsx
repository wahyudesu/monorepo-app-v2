import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntegrationCardProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  handle?: string | null;
  followers?: string | null;
  posts?: number | null;
  connected: boolean;
  onToggle: (id: string) => void;
}

export function IntegrationCard({
  id,
  name,
  icon,
  color,
  handle,
  followers,
  posts,
  connected,
  onToggle,
}: IntegrationCardProps) {
  return (
    <Card
      className={cn(
        "border-border/50 h-full transition-all",
        connected ? "border-primary/30" : "cursor-pointer hover:border-primary/50 hover:shadow-md",
      )}
    >
      <CardContent className="p-5 h-full flex flex-col">
        {/* Header with icon and status */}
        <div className="flex items-start justify-between mb-3">
          <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", color)}>
            <span className="text-2xl">{icon}</span>
          </div>
          {connected && (
            <Badge variant="secondary" className="text-xs bg-success/10 text-success border-success/20">
              Connected
            </Badge>
          )}
        </div>

        {/* Platform Name */}
        <p className="font-display font-semibold text-base mb-1">{name}</p>

        {/* Connected Info */}
        {connected && handle ? (
          <>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3">
              <Link2 className="h-3.5 w-3.5" />
              {handle}
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3 p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Followers</p>
                <p className="text-sm font-semibold">{followers}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Posts</p>
                <p className="text-sm font-semibold">{posts}</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground mb-3">Connect your {name} account to start posting</p>
        )}

        {/* Action Button */}
        <div className="mt-auto">
          {connected ? (
            <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => onToggle(id)}>
              <Trash2 className="h-4 w-4" />
              Disconnect
            </Button>
          ) : (
            <Button variant="default" size="sm" className="w-full gap-2" onClick={() => onToggle(id)}>
              <Link2 className="h-4 w-4" />
              Connect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
