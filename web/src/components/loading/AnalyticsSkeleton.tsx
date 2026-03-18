export function AnalyticsSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="space-y-2 animate-pulse">
        <div className="h-8 w-56 bg-muted rounded" />
        <div className="h-4 w-80 bg-muted/60 rounded" />
      </div>

      {/* Summary Cards - Minimalis borderless design */}
      <div className="grid grid-cols-5 gap-4 overflow-x-auto pb-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse min-w-[140px]">
            <div className="h-28 bg-muted/50 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="space-y-4 animate-pulse">
        <div className="h-6 w-48 bg-muted rounded" />
        <div className="h-80 bg-muted/30 rounded-lg border border-border/50" />
      </div>

      {/* Published Posts Grid */}
      <div className="space-y-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-6 w-40 bg-muted rounded" />
          <div className="h-6 w-16 bg-muted/60 rounded" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-muted/30 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="flex items-center justify-center h-[300px] w-full animate-pulse">
      <div className="h-full w-full bg-muted/20 rounded-lg" />
    </div>
  );
}
