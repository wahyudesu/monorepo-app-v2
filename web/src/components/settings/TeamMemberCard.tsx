import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMemberCardProps {
  id: string;
  name: string;
  role: "Admin" | "Editor" | "Member";
  email: string;
  avatar: string;
  online: boolean;
  tasksCompleted: number;
}

const roleConfig = {
  Admin: { variant: "default" as const, className: "bg-primary text-primary-foreground" },
  Editor: { variant: "secondary" as const, className: "bg-blue-500/15 text-blue-600" },
  Member: { variant: "outline" as const, className: "" },
};

export function TeamMemberCard({
  name,
  role,
  email,
  avatar,
  online,
  tasksCompleted,
}: TeamMemberCardProps) {
  const config = roleConfig[role];

  return (
    <Card className="border-border/50 transition-shadow hover:shadow-md">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-9 w-9">
                <AvatarImage src={avatar} />
                <AvatarFallback>{name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
                  online ? "bg-success" : "bg-muted-foreground/40"
                )}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{name}</p>
                <Badge variant={config.variant} className={cn("text-[10px] px-1.5 py-0 h-4", config.className)}>
                  {role}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">{email}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
