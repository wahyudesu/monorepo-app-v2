import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Trash2, Check, CheckCheck, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageCardProps {
  id: string;
  type: "message" | "comment";
  platform: string;
  platformIcon: React.ReactNode;
  platformColor: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  mediaPost?: string;
  onClick: () => void;
  onToggleRead: (id: string) => void;
  onToggleStar: (id: string) => void;
  onDelete: (id: string) => void;
}

export function MessageCard({
  id,
  platform,
  platformIcon,
  platformColor,
  sender,
  avatar,
  content,
  timestamp,
  isRead,
  isStarred,
  mediaPost,
  onClick,
  onToggleRead,
  onToggleStar,
  onDelete,
}: MessageCardProps) {
  return (
    <Card
      className={cn(
        "border-border/50 cursor-pointer transition-all hover:shadow-md",
        !isRead && "bg-primary/5 border-primary/30"
      )}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn("mt-1", platformColor)}>{platformIcon}</div>

          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} />
            <AvatarFallback>{sender[0].toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold truncate">{sender}</span>
              <Badge variant="outline" className="text-[10px] capitalize">
                {platform}
              </Badge>
              {!isRead && <Badge className="bg-primary text-primary-foreground text-[10px]">New</Badge>}
              {isStarred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{content}</p>
            {mediaPost && (
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                On: {mediaPost}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">{timestamp}</p>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onToggleRead(id);
              }}
            >
              {isRead ? (
                <Check className="h-4 w-4 text-muted-foreground" />
              ) : (
                <CheckCheck className="h-4 w-4 text-primary" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar(id);
              }}
            >
              <Star
                className={cn(
                  "h-4 w-4",
                  isStarred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                )}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
