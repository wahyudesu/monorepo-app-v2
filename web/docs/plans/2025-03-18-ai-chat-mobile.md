# AI Chat Page - Mobile Friendly Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make AI Chat page and related components mobile-friendly with responsive design

**Architecture:** Use Tailwind responsive breakpoints to adapt layouts for mobile screens

**Tech Stack:** React, TypeScript, Tailwind CSS

---

## Task 1: Update AI Page Platform Selector

**Files:**
- Modify: `src/app/ai/page.tsx`

**Step 1: Make platform selector horizontally scrollable on mobile**

```tsx
{/* Platform Selector - Compact */}
<Card className="border-border/50 p-3">
  <label className="text-xs font-medium mb-2 block text-muted-foreground">Platform</label>
  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
    {platforms.map((platform) => (
      <button
        key={platform.id}
        onClick={() => setSelectedPlatform(platform.id)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-sm whitespace-nowrap flex-shrink-0",
          selectedPlatform === platform.id
            ? "border-primary bg-primary/5"
            : "border-border/50 hover:border-border hover:bg-muted/30"
        )}
      >
        <span>{platform.icon}</span>
        <span className="font-medium">{platform.name}</span>
      </button>
    ))}
  </div>
</Card>
```

**Step 2: Test on mobile viewport**

---

## Task 2: Update Composer Tone Selector for Mobile

**Files:**
- Modify: `src/components/ui/composer.tsx`

**Step 1: Make tone selector responsive - hide on small screens, show dropdown**

```tsx
{/* Tone Selector - inline pills */}
{showToneSelector && (
  <div className="flex items-center gap-1.5 ml-2">
    <span className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:inline">Tone:</span>
    <div className="flex items-center gap-1">
      {toneOptions.map((toneOption) => (
        <button
          key={toneOption.value}
          type="button"
          onClick={() => setSelectedTone(toneOption.value)}
          disabled={disabled || isLoading}
          className={cn(
            "flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-full text-xs font-medium transition-all",
            "cursor-pointer",
            selectedTone === toneOption.value
              ? "bg-[#00bbff] text-white"
              : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-600",
            "disabled:cursor-wait disabled:opacity-70",
          )}
          title={toneOption.label}
        >
          <span className={cn("w-1.5 h-1.5 rounded-full", toneOption.color)} />
          <span className="hidden sm:inline">{toneOption.label}</span>
        </button>
      ))}
    </div>
  </div>
)}
```

**Step 2: Test on mobile - tone pills show as colored dots only on small screens**

---

## Task 3: Update GeneratedPostCard for Mobile

**Files:**
- Modify: `src/components/ai/generated-post-card.tsx`

**Step 1: Make header responsive**

```tsx
{/* Header */}
<div className="border-b border-border/50 px-3 sm:px-4 py-2 sm:py-3 flex items-start sm:items-center justify-between bg-muted/30 gap-2">
  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
    <span className="text-sm sm:text-base">{platform?.icon}</span>
    <span className="font-medium text-sm">{platform?.name}</span>
    {tone && (
      <Badge variant="secondary" className="text-xs gap-1">
        <span className={cn("w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full", toneColors[tone.value])} />
        <span className="hidden sm:inline">{tone.label}</span>
      </Badge>
    )}
  </div>
  <Button
    variant="ghost"
    size="icon"
    className="h-7 w-7 text-muted-foreground hover:text-destructive flex-shrink-0"
    onClick={() => onDelete(post.id)}
  >
    <Trash2 className="h-3.5 w-3.5" />
  </Button>
</div>
```

**Step 2: Make action buttons responsive - stack on mobile**

```tsx
{/* Actions */}
<div className="border-t border-border/50 px-3 sm:px-4 py-2 sm:py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-muted/30 gap-2">
  <div className="flex items-center gap-2 w-full sm:w-auto">
    <Button
      variant="outline"
      size="sm"
      onClick={handlePlan}
      disabled={isPlanning}
      className="gap-1.5 flex-1 sm:flex-initial"
    >
      <Calendar className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{isPlanning ? "Planning..." : "Plan"}</span>
      <span className="sm:hidden">{isPlanning ? "..." : "Plan"}</span>
    </Button>
    <Button
      size="sm"
      onClick={handlePost}
      disabled={isPosting}
      className="gap-1.5 flex-1 sm:flex-initial"
    >
      <Send className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{isPosting ? "Posting..." : "Post"}</span>
      <span className="sm:hidden">{isPosting ? "..." : "Post"}</span>
    </Button>
  </div>
  <Button
    variant="ghost"
    size="sm"
    onClick={handleCopy}
    className="text-muted-foreground w-full sm:w-auto"
  >
    {copied ? (
      <>
        <span className="text-green-500 mr-1">✓</span>
        <span className="hidden sm:inline">Copied</span>
        <span className="sm:hidden">Copied</span>
      </>
    ) : (
      <>
        <Copy className="h-3.5 w-3.5 mr-1 sm:mr-0" />
        <span className="hidden sm:inline">Copy</span>
        <span className="sm:hidden">Copy</span>
      </>
    )}
  </Button>
</div>
```

**Step 3: Add responsive padding to content area**

```tsx
{/* Content */}
<div className="p-3 sm:p-4">
```

---

## Task 4: Add Mobile Utilities

**Files:**
- Create: `src/lib/utils/mobile.ts`

**Step 1: Create mobile utility class**

```typescript
import { cn } from "@/lib/utils";

// Hide scrollbar but keep functionality
export const scrollbarHide = "scrollbar-hide scrollbar-width-none scroll-p-0";

// For horizontally scrolling containers on mobile
export const horizontalScroll = "overflow-x-auto overflow-y-hidden snap-x snap-mandatory";

// Snap center for items in horizontal scroll
export const snapCenter = "snap-center";
```

**Step 2: Add to globals.css if not present**

```css
/* Hide scrollbar for mobile */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

---

## Task 5: Update Empty State for Mobile

**Files:**
- Modify: `src/app/ai/page.tsx`

**Step 1: Make empty state more compact on mobile**

```tsx
{/* Empty State */}
{posts.length === 0 && !isGenerating && (
  <Card className="border-border/50 border-dashed">
    <div className="text-center py-8 sm:py-12 px-4">
      <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/30 mx-auto mb-2 sm:mb-3" />
      <h3 className="text-sm sm:text-base font-semibold mb-1">Ready to create content?</h3>
      <p className="text-xs sm:text-sm text-muted-foreground">Type your topic above and let AI generate posts for you</p>
    </div>
  </Card>
)}
```

---

## Task 6: Update Loading State for Mobile

**Files:**
- Modify: `src/app/ai/page.tsx`

**Step 1: Make loading state responsive**

```tsx
{/* Loading State */}
{isGenerating && (
  <Card className="border-border/50">
    <div className="text-center py-8 sm:py-12">
      <div className="flex gap-1 justify-center mb-2 sm:mb-3">
        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground">Generating your post...</p>
    </div>
  </Card>
)}
```

---

## Task 7: Add Container Padding for Mobile

**Files:**
- Modify: `src/app/ai/page.tsx`

**Step 1: Add responsive container padding**

```tsx
return (
  <div className="mx-auto max-w-2xl space-y-4 sm:space-y-6 px-4 sm:px-0 py-4 sm:py-6">
```

**Step 2: Test on mobile - ensure no horizontal overflow**

---

## Task 8: Test on Multiple Viewports

**Files:**
- Manual testing

**Step 1: Test on mobile viewport (320px - 480px)**
- Platform selector scrolls horizontally
- Tone pills show colored dots only
- Post card buttons stack properly
- No horizontal overflow

**Step 2: Test on tablet viewport (481px - 768px)**
- All labels visible
- Proper spacing maintained

**Step 3: Test on desktop (769px+)**
- Original layout preserved

---

## Summary of Changes

1. **Platform Selector**: Horizontally scrollable with `whitespace-nowrap` and `flex-shrink-0`
2. **Tone Selector**: Hide text label on mobile (`< sm`), show colored dot only
3. **GeneratedPostCard Header**: Hide tone label on mobile, adjust spacing
4. **Action Buttons**: Stack vertically on mobile with full width
5. **Empty/Loading States**: Reduce padding on mobile
6. **Container**: Add horizontal padding on mobile only

**Breakpoints Used:**
- `sm:` (640px+) - Tablet and up
- Hidden elements on mobile (< 640px)
