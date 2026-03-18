"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface BrandStatsTabsProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function BrandStatsTabs({ value, onChange, className }: BrandStatsTabsProps) {
  return (
    <Tabs value={value} onValueChange={onChange} className={cn("w-full", className)}>
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="audience">Audience</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
