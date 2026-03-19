import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMemberCardProps {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  online: boolean;
  tasksCompleted: number;
}

export function TeamMemberCard({
  name,
  role,
  email,
  avatar,
  online,
  tasksCompleted,
}: TeamMemberCardProps) {
  return (
    <Card className="border-border/50 transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-11 w-11">
                <AvatarImage src={avatar} />
                <AvatarFallback>{name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card",
                  online ? "bg-success" : "bg-muted-foreground/40"
                )}
              />
            </div>
            <div>
              <p className="text-sm font-semibold">{name}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            {email}
          </div>
          <Badge variant="secondary" className="text-[10px]">
            {tasksCompleted} tasks
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
