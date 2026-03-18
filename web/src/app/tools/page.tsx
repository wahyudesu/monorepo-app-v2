"use client";

import { useState } from "react";
import { FileText, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PersonalBrandingBuilder } from "@/components/post/PersonalBrandingBuilder";
import { ContentScriptEngine } from "./components/ContentScriptEngine";
import { tools, type ToolId } from "./constants";

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<ToolId>("script-engine");

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Tools 🛠️</h1>
        <p className="text-sm text-muted-foreground">Personal branding & content creation tools</p>
      </div>

      {/* Tool selector */}
      <div className="flex gap-3">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-4 py-3 text-left transition-all",
              activeTool === tool.id
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border/50 bg-card hover:border-border hover:shadow-sm"
            )}
          >
            <div
              className={cn(
                "rounded-lg p-2",
                activeTool === tool.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              )}
            >
              {tool.icon === "FileText" && <FileText className="h-4 w-4" />}
              {tool.icon === "UserCheck" && <UserCheck className="h-4 w-4" />}
            </div>
            <div>
              <p className="text-sm font-semibold">{tool.label}</p>
              <p className="text-[11px] text-muted-foreground">{tool.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Tool content */}
      <Card className="border-border/50">
        <CardContent className="p-6">
          {activeTool === "script-engine" && <ContentScriptEngine />}
          {activeTool === "branding" && <PersonalBrandingBuilder />}
        </CardContent>
      </Card>
    </div>
  );
}
