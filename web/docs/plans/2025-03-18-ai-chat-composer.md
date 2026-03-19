# AI Chat Page with Composer - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the AI Chat page to use the Composer component with tone selector, generating social media posts that accumulate in a list with Plan/Post actions.

**Architecture:** Replace the current Textarea-based input with the existing Composer component, add tone selector as pill chips in the toolbar, create a compact GeneratedPostCard component for displaying posts, and manage state for a growing list of generated posts.

**Tech Stack:** React, TypeScript, Tailwind CSS, shadcn/ui components

---

## Task 1: Create Types and Constants

**Files:**
- Create: `src/lib/types/ai-post.ts`

**Step 1: Create the types file**

```typescript
// src/lib/types/ai-post.ts
export type Platform = "threads" | "linkedin" | "twitter" | "instagram" | "tiktok";
export type ContentType = "single" | "thread" | "carousel" | "video";
export type Tone = "professional" | "casual" | "inspirational" | "educational" | "friendly" | "storytelling";
export type ScriptGoal = "engagement" | "sales" | "branding" | "education" | "entertainment";

export interface ToneOption {
  value: Tone;
  label: string;
  color: string;
  shortDesc: string;
}

export interface GeneratedPost {
  id: string;
  platform: Platform;
  contentType: ContentType;
  tone: Tone;
  goal: ScriptGoal;
  content: string;
  hashtags: string[];
  cta: string;
  createdAt: Date;
}

export interface PlatformConfig {
  id: Platform;
  name: string;
  icon: string;
  color: string;
  description: string;
  maxChars: number;
  supports: ContentType[];
}
```

**Step 2: Create constants file**

```typescript
// src/lib/constants/ai-post.ts
import { PlatformConfig, ToneOption, ContentType, Platform, Tone, ScriptGoal } from "@/lib/types/ai-post";

export const platforms: PlatformConfig[] = [
  { id: "threads", name: "Threads", icon: "🧵", color: "bg-black dark:bg-white", description: "Text & visual conversations", maxChars: 500, supports: ["single", "thread"] },
  { id: "linkedin", name: "LinkedIn", icon: "💼", color: "bg-blue-600", description: "Professional networking", maxChars: 3000, supports: ["single", "carousel", "video"] },
  { id: "twitter", name: "Twitter/X", icon: "𝕏", color: "bg-black", description: "Real-time conversations", maxChars: 280, supports: ["single", "thread"] },
  { id: "instagram", name: "Instagram", icon: "📸", color: "bg-gradient-to-br from-purple-500 to-pink-500", description: "Visual storytelling", maxChars: 2200, supports: ["single", "carousel", "video"] },
  { id: "tiktok", name: "TikTok", icon: "🎵", color: "bg-black", description: "Short-form video", maxChars: 150, supports: ["video"] },
];

export const contentTypes: { value: ContentType; label: string; icon: string; description: string }[] = [
  { value: "single", label: "Single Post", icon: "📝", description: "One standalone post" },
  { value: "thread", label: "Thread Series", icon: "🧵", description: "Multi-part thread" },
  { value: "carousel", label: "Carousel", icon: "🎠", description: "Multi-slide content" },
  { value: "video", label: "Video Script", icon: "🎬", description: "Script for short-form video" },
];

export const tones: ToneOption[] = [
  { value: "professional", label: "Professional", color: "bg-blue-500", shortDesc: "Expert & authoritative" },
  { value: "casual", label: "Casual", color: "bg-green-500", shortDesc: "Friendly & relaxed" },
  { value: "inspirational", label: "Inspirational", color: "bg-purple-500", shortDesc: "Motivating & uplifting" },
  { value: "educational", label: "Educational", color: "bg-orange-500", shortDesc: "Informative & teaching" },
  { value: "friendly", label: "Friendly", color: "bg-pink-500", shortDesc: "Warm & welcoming" },
  { value: "storytelling", label: "Storytelling", color: "bg-indigo-500", shortDesc: "Narrative & engaging" },
];

export const goals: { value: ScriptGoal; label: string; icon: string; description: string }[] = [
  { value: "engagement", label: "Boost Engagement", icon: "💬", description: "Get likes, comments, shares" },
  { value: "sales", label: "Sales/Conversion", icon: "🛒", description: "Drive purchases or sign-ups" },
  { value: "branding", label: "Brand Awareness", icon: "🎯", description: "Build your brand identity" },
  { value: "education", label: "Educate", icon: "📚", description: "Share knowledge and insights" },
  { value: "entertainment", label: "Entertainment", icon: "🎭", description: "Entertain and delight" },
];

// Mock generator function - replace with actual API call
export const generatePost = async (
  topic: string,
  platform: Platform,
  contentType: ContentType,
  tone: Tone,
  goal: ScriptGoal
): Promise<{ content: string; hashtags: string[]; cta: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const generateHashtags = (topic: string): string[] => {
    const words = topic.toLowerCase().split(" ").filter(w => w.length > 2);
    const baseTags = words.map(w => `#${w.replace(/[^a-z0-9]/g, "")}`);
    return [...baseTags.slice(0, 3), "#AIContent", "#SocialMedia"];
  };

  const generateCTA = (goal: ScriptGoal): string => {
    const ctas = {
      engagement: "💬 Drop your thoughts below!",
      sales: "🔗 Link in bio for more!",
      branding: "Follow for more insights",
      education: "💡 Save this for later!",
      entertainment: "👇 Double tap if you agree!",
    };
    return ctas[goal];
  };

  const content = `${topic}\n\n${tone === "casual" ? "Here's the thing:" : "Key points:"}\n\n• This matters more than you think\n• Consistency is key\n• Results take time\n\n${generateCTA(goal)}`;

  return {
    content,
    hashtags: generateHashtags(topic),
    cta: generateCTA(goal),
  };
};
```

**Step 3: Commit**

```bash
git add src/lib/types/ai-post.ts src/lib/constants/ai-post.ts
git commit -m "feat: add AI post types and constants"
```

---

## Task 2: Create GeneratedPostCard Component

**Files:**
- Create: `src/components/ai/generated-post-card.tsx`

**Step 1: Create the card component**

```typescript
// src/components/ai/generated-post-card.tsx
"use client";

import { useState } from "react";
import { Copy, Trash2, Send, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { GeneratedPost, Tone } from "@/lib/types/ai-post";
import { platforms, tones } from "@/lib/constants/ai-post";

interface GeneratedPostCardProps {
  post: GeneratedPost;
  onPlan: (id: string) => void;
  onPost: (id: string) => void;
  onDelete: (id: string) => void;
}

const toneColors: Record<Tone, string> = {
  professional: "bg-blue-500",
  casual: "bg-green-500",
  inspirational: "bg-purple-500",
  educational: "bg-orange-500",
  friendly: "bg-pink-500",
  storytelling: "bg-indigo-500",
};

export function GeneratedPostCard({ post, onPlan, onPost, onDelete }: GeneratedPostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlanning, setIsPlanning] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const platform = platforms.find(p => p.id === post.platform);
  const tone = tones.find(t => t.value === post.tone);

  const handleCopy = () => {
    const fullContent = `${post.content}\n\n${post.hashtags.join(" ")}`;
    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlan = async () => {
    setIsPlanning(true);
    await onPlan(post.id);
    setIsPlanning(false);
  };

  const handlePost = async () => {
    setIsPosting(true);
    await onPost(post.id);
    setIsPosting(false);
  };

  const contentPreview = post.content.split("\n").slice(0, 3).join("\n");
  const shouldTruncate = post.content.split("\n").length > 3;

  return (
    <Card className="border-border/50 overflow-hidden">
      {/* Header */}
      <div className="border-b border-border/50 px-4 py-3 flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-2">
          <span className="text-base">{platform?.icon}</span>
          <span className="font-medium text-sm ">{platform?.name}</span>
          {tone && (
            <>
              <span className="text-muted-foreground">•</span>
              <Badge variant="secondary" className="text-xs gap-1">
                <span className={cn("w-1.5 h-1.5 rounded-full", toneColors[tone.value])} />
                {tone.label}
              </Badge>
            </>
          )}
          <Badge variant="outline" className="text-xs">
            {post.content.length} / {platform?.maxChars} chars
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(post.id)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        <pre
          className={cn(
            "whitespace-pre-wrap text-sm leading-relaxed font-sans text-foreground",
            !expanded && "max-h-20 overflow-hidden"
          )}
        >
          {expanded ? post.content : contentPreview}
          {!expanded && shouldTruncate && (
            <span
              className="text-primary cursor-pointer hover:underline ml-1"
              onClick={() => setExpanded(true)}
            >
              [+ Show more]
            </span>
          )}
        </pre>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {post.hashtags.map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="font-mono text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-border/50 px-4 py-3 flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlan}
            disabled={isPlanning}
            className="gap-1.5"
          >
            <Calendar className="h-3.5 w-3.5" />
            {isPlanning ? "Planning..." : "Plan"}
          </Button>
          <Button
            size="sm"
            onClick={handlePost}
            disabled={isPosting}
            className="gap-1.5"
          >
            <Send className="h-3.5 w-3.5" />
            {isPosting ? "Posting..." : "Post"}
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-muted-foreground"
        >
          {copied ? (
            <>
              <span className="text-green-500 mr-1">✓</span>
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
```

**Step 2: Create index file**

```typescript
// src/components/ai/index.ts
export { GeneratedPostCard } from "./generated-post-card";
```

**Step 3: Commit**

```bash
git add src/components/ai/generated-post-card.tsx src/components/ai/index.ts
git commit -m "feat: add GeneratedPostCard component"
```

---

## Task 3: Update Composer Component with Tone Selector

**Files:**
- Modify: `src/components/ui/composer.tsx`

**Step 1: Add tone selector props and UI**

Find the `ComposerProps` interface and add:

```typescript
export interface ComposerProps {
  // ... existing props

  // Tone selector
  tone?: string;
  onToneChange?: (tone: string) => void;
  toneOptions?: Array<{ value: string; label: string; color: string; shortDesc: string }>;
}
```

Add the new props to destructuring:

```typescript
export const Composer: FC<ComposerProps> = ({
  // ... existing props
  tone,
  onToneChange,
  toneOptions = [],
}) => {
```

In the toolbar section (around line 293, after the context menu), add the tone selector:

```tsx
{/* Tone Selector - pills in toolbar */}
{toneOptions.length > 0 && onToneChange && (
  <div className="flex items-center gap-1.5 ml-2">
    <span className="text-xs text-muted-foreground">Tone:</span>
    <div className="flex items-center gap-1">
      {toneOptions.map((toneOption) => (
        <button
          key={toneOption.value}
          type="button"
          onClick={() => onToneChange(toneOption.value)}
          disabled={disabled || isLoading}
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all",
            "cursor-pointer",
            tone === toneOption.value
              ? "bg-[#00bbff] text-white"
              : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-600",
            "disabled:cursor-wait disabled:opacity-70",
          )}
        >
          <span className={cn("w-1.5 h-1.5 rounded-full", toneOption.color)} />
          {toneOption.label}
        </button>
      ))}
    </div>
  </div>
)}
```

**Step 2: Commit**

```bash
git add src/components/ui/composer.tsx
git commit -m "feat: add tone selector to Composer component"
```

---

## Task 4: Update AI Chat Page

**Files:**
- Modify: `src/app/ai/page.tsx`

**Step 1: Replace entire page content**

```typescript
"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Composer } from "@/components/ui/composer";
import { GeneratedPostCard } from "@/components/ai";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generatePost, platforms, tones, goals, contentTypes } from "@/lib/constants/ai-post";
import type { Platform, ContentType, Tone, ScriptGoal, GeneratedPost } from "@/lib/types/ai-post";

export default function AIChatPage() {
  const [topic, setTopic] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("threads");
  const [contentType, setContentType] = useState<ContentType>("single");
  const [selectedTone, setSelectedTone] = useState<Tone>("casual");
  const [selectedGoal, setSelectedGoal] = useState<ScriptGoal>("engagement");
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentPlatform = platforms.find(p => p.id === selectedPlatform);

  const handleGenerate = async (message: string) => {
    if (!message.trim() || isGenerating) return;

    setTopic(message);
    setIsGenerating(true);

    try {
      const result = await generatePost(message, selectedPlatform, contentType, selectedTone, selectedGoal);

      const newPost: GeneratedPost = {
        id: `${Date.now()}`,
        platform: selectedPlatform,
        contentType,
        tone: selectedTone,
        goal: selectedGoal,
        content: result.content,
        hashtags: result.hashtags,
        cta: result.cta,
        createdAt: new Date(),
      };

      setPosts(prev => [newPost, ...prev]);
    } catch (error) {
      console.error("Failed to generate post:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlan = async (id: string) => {
    console.log("Planning post:", id);
    // TODO: Implement plan/save to drafts
    alert("Post saved to drafts!");
  };

  const handlePost = async (id: string) => {
    console.log("Posting:", id);
    // TODO: Implement publish to platform
    alert("Post published to " + platforms.find(p => p.id === posts.find(post => post.id === id)?.platform)?.name + "!");
  };

  const handleDelete = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Social Script Generator
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Generate platform-specific social media content</p>
        </div>
      </div>

      {/* Platform Selector - Compact */}
      <Card className="border-border/50 p-3">
        <label className="text-xs font-medium mb-2 block text-muted-foreground">Platform</label>
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-sm",
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

      {/* Composer with Tone Selector */}
      <Composer
        placeholder="What do you want to post about?"
        tone={selectedTone}
        onToneChange={setSelectedTone}
        toneOptions={tones}
        onSubmit={handleGenerate}
        isLoading={isGenerating}
        contextOptions={[
          {
            id: "content-type",
            label: "Format: " + contentTypes.find(c => c.value === contentType)?.label,
            description: contentTypes.find(c => c.value === contentType)?.description,
            onClick: () => {
              // Cycle through content types
              const currentIndex = contentTypes.findIndex(c => c.value === contentType);
              const nextIndex = (currentIndex + 1) % contentTypes.length;
              const supportedTypes = contentTypes.filter(c => currentPlatform?.supports.includes(c.value));
              setContentType(supportedTypes[(supportedTypes.findIndex(c => c.value === contentType) + 1) % supportedTypes.length]?.value || contentType);
            },
          },
          {
            id: "goal",
            label: "Goal: " + goals.find(g => g.value === selectedGoal)?.label,
            description: goals.find(g => g.value === selectedGoal)?.description,
            onClick: () => {
              // Cycle through goals
              const currentIndex = goals.findIndex(g => g.value === selectedGoal);
              const nextIndex = (currentIndex + 1) % goals.length;
              setSelectedGoal(goals[nextIndex]?.value || selectedGoal);
            },
          },
        ]}
      />

      {/* Generated Posts List */}
      {posts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground">
            Generated Posts ({posts.length})
          </h2>
          {posts.map((post) => (
            <GeneratedPostCard
              key={post.id}
              post={post}
              onPlan={handlePlan}
              onPost={handlePost}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {posts.length === 0 && !isGenerating && (
        <Card className="border-border/50 border-dashed">
          <div className="text-center py-12">
            <Sparkles className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <h3 className="text-base font-semibold mb-1">Ready to create content?</h3>
            <p className="text-sm text-muted-foreground">
              Type your topic above and let AI generate posts for you
            </p>
          </div>
        </Card>
      )}

      {/* Loading State */}
      {isGenerating && (
        <Card className="border-border/50">
          <div className="text-center py-12">
            <div className="flex gap-1 justify-center mb-3">
              <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <p className="text-sm text-muted-foreground">Generating your post...</p>
          </div>
        </Card>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/ai/page.tsx
git commit -m "feat: update AI page with Composer and post list"
```

---

## Task 5: Update Imports and Exports

**Files:**
- Modify: `src/components/ui/composer.tsx`

**Step 1: Ensure Composer is exported properly**

Check that the component has:
```typescript
export { Composer };
export default Composer;
export type { Tool, SlashCommandMatch, UploadedFile, ComposerContextOption, ComposerProps };
```

**Step 2: Update main index if needed**

```bash
# Check if there's a components/ui/index.ts and add Composer if missing
```

**Step 3: Commit**

```bash
git add src/components/ui/composer.tsx
git commit -m "chore: ensure Composer exports are complete"
```

---

## Task 6: Verify Build and Types

**Files:**
- Run: `npm run build` or `pnpm build`

**Step 1: Run type check**

```bash
pnpm tsc --noEmit
```

Expected: No type errors

**Step 2: Fix any type errors**

If errors occur, fix them and re-run.

**Step 3: Run build**

```bash
pnpm build
```

Expected: Build succeeds

**Step 4: Commit**

```bash
git commit -m "chore: fix type errors and build issues"
```

---

## Task 7: Test the Implementation

**Files:**
- Manual testing

**Step 1: Start dev server**

```bash
pnpm dev
```

**Step 2: Navigate to /ai page**

**Step 3: Test functionality:**
- Select different platforms
- Select different tones
- Type a topic and submit
- Verify post appears in list
- Test Plan button
- Test Post button
- Test Delete button
- Test Copy button
- Test expand/collapse content

**Step 4: Commit any fixes**

```bash
git add .
git commit -m "fix: issues found during testing"
```

---

## Summary

This implementation plan:
1. Creates type definitions and constants for AI posts
2. Builds a compact GeneratedPostCard component
3. Enhances the Composer with tone selector
4. Replaces the AI page to use the new components
5. Maintains a growing list of generated posts
6. Provides Plan/Post actions for each post

**Total estimated time:** 2-3 hours

**Next steps after implementation:**
- Connect to real AI generation API
- Implement actual Plan (save to drafts)
- Implement actual Post (publish to platforms with OAuth)
- Add localStorage persistence for posts
