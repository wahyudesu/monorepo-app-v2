export function InboxSkeleton() {
  return (
    <div className="mx-auto max-w-7xl h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="space-y-2 animate-pulse">
          <div className="h-8 w-24 bg-muted rounded" />
          <div className="h-4 w-64 bg-muted/60 rounded" />
        </div>
        <div className="h-10 w-44 bg-muted rounded animate-pulse" />
      </div>

      {/* CRM Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-6rem)]">
        {/* Conversation List */}
        <div className="border border-border/50 rounded-xl overflow-hidden flex flex-col animate-pulse">
          {/* Search */}
          <div className="p-3 border-b border-border/50">
            <div className="h-9 bg-muted/50 rounded-lg" />
          </div>

          {/* Conversation Items */}
          <div className="flex-1 p-2 space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-muted/30 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Chat View */}
        <div className="hidden lg:flex lg:col-span-2 border border-border/50 rounded-xl items-center justify-center animate-pulse">
          <div className="text-center space-y-3">
            <div className="h-16 w-16 bg-muted/30 rounded-full mx-auto" />
            <div className="h-4 w-48 bg-muted/50 rounded mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConversationListSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-20 bg-muted/30 rounded-xl" />
      ))}
    </div>
  );
}

export function ChatViewSkeleton() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-muted/50 rounded-full" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-muted/50 rounded" />
            <div className="h-3 w-24 bg-muted/30 rounded" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`h-16 w-64 rounded-2xl ${i % 2 === 0 ? "bg-muted/30 ml-0" : "bg-muted/30 ml-auto"}`}
          />
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="h-11 bg-muted/50 rounded-lg" />
      </div>
    </div>
  );
}
