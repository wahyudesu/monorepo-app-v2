export function PageSkeleton() {
  return (
    <div className="space-y-4 animate-pulse mx-auto max-w-6xl p-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="h-4 w-64 bg-muted/60 rounded" />
      </div>

      {/* Content Cards */}
      <div className="grid gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-lg" />
        ))}
      </div>
    </div>
  );
}
