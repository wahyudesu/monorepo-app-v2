# AI Chat Page with Composer - Design Document

**Date:** 2025-03-18
**Status:** Approved

## Overview

Redesign the AI Chat page (`/app/ai/page.tsx`) to use the existing Composer component instead of the current Textarea-based input. The page will generate social media posts that accumulate in a list, with options to save to drafts or publish.

## Layout Structure

```
┌─────────────────────────────────────────┐
│  Header: "AI Social Script Generator"   │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐  │
│  │   Composer with Tone Selector    │  │
│  │   - Tone pills in toolbar        │  │
│  │   - Platform selector            │  │
│  │   - Content type selector        │  │
│  │   - Goal selector                │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│  Generated Posts (growing list)         │
│  ┌─────────────────────────────────┐    │
│  │ 🧵 Thread 1         [Plan][Post]│    │
│  │ Content preview...              │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ 🧵 Thread 2         [Plan][Post]│    │
│  │ Content preview...              │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

## Components

### 1. Enhanced Composer Component

**Location:** `/components/ui/composer.tsx`

**New Props:**
```tsx
interface ComposerProps {
  // ... existing props

  // Tone selector
  tone?: Tone;
  onToneChange?: (tone: Tone) => void;
  toneOptions?: ToneOption[];

  // Platform selector (optional, can be context menu)
  platform?: Platform;
  onPlatformChange?: (platform: Platform) => void;

  // Content type selector
  contentType?: ContentType;
  onContentTypeChange?: (type: ContentType) => void;

  // Goal selector
  goal?: ScriptGoal;
  onGoalChange?: (goal: ScriptGoal) => void;
}
```

**UI Changes:**
- Add tone selector as pill chips in the toolbar (between attach button and send button)
- Each tone shows as: colored dot + label
- Selected tone has primary background
- Other selectors can be in context menu (plus button dropdown)

### 2. Compact Post Card Component

**Location:** `/components/ai/generated-post-card.tsx` (new)

**Props:**
```tsx
interface GeneratedPostCardProps {
  post: GeneratedPost;
  onPlan: (id: string) => void;
  onPost: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy?: (id: string) => void;
}
```

**UI Structure:**
```
┌────────────────────────────────────────────┐
│ 🧵 Threads  •  Casual  •  234 chars       │
│                                            │
│ Here's what most people get wrong...      │
│                                            │
│ Productivity isn't about doing more...    │
│ [+ Show more]                              │
│                                            │
│ [#Productivity #Tips #Threads]            │
│                                            │
│ [Plan] [Post]                   [Delete]  │
└────────────────────────────────────────────┘
```

**Features:**
- Platform icon + name
- Tone badge (colored)
- Content preview (2-3 lines, expandable)
- Hashtags as badges
- Character count
- Plan button (secondary style)
- Post button (primary style)
- Delete button (ghost style, right-aligned)

### 3. AI Chat Page

**Location:** `/app/ai/page.tsx`

**State:**
```tsx
interface GeneratedPost {
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

const [posts, setPosts] = useState<GeneratedPost[]>([]);
const [isGenerating, setIsGenerating] = useState(false);
```

**Flow:**
1. User types topic in Composer
2. Selects tone, platform, content type, goal
3. Clicks send (or presses Enter)
4. Shows loading state
5. API generates content
6. New post added to list (top)
7. User can Plan or Post each individually

## Types

```tsx
type Platform = "threads" | "linkedin" | "twitter" | "instagram" | "tiktok";
type ContentType = "single" | "thread" | "carousel" | "video";
type Tone = "professional" | "casual" | "inspirational" | "educational" | "friendly" | "storytelling";
type ScriptGoal = "engagement" | "sales" | "branding" | "education" | "entertainment";

interface ToneOption {
  value: Tone;
  label: string;
  color: string;
  shortDesc: string;
}
```

## API Integration

**Generate Endpoint:**
```tsx
POST /api/ai/generate-post
Body: {
  topic: string;
  platform: Platform;
  contentType: ContentType;
  tone: Tone;
  goal: ScriptGoal;
}
Response: {
  content: string;
  hashtags: string[];
  cta: string;
  tips: string[];
}
```

**Plan Endpoint:**
```tsx
POST /api/posts/plan
Body: {
  postId: string;
  post: GeneratedPost;
}
```

**Post Endpoint:**
```tsx
POST /api/posts/publish
Body: {
  postId: string;
  platform: Platform;
  content: string;
}
```

## Implementation Order

1. Create `GeneratedPostCard` component
2. Update `Composer` to accept tone selector props
3. Create tone selector UI in Composer toolbar
4. Update AI page to use Composer instead of Textarea
5. Implement post list with Plan/Post actions
6. Connect to API endpoints (mock or real)
7. Add loading and empty states

## Notes

- Keep generated posts in state (could persist to localStorage)
- Consider adding "Regenerate" option for each post
- Plan could save to a drafts page (future feature)
- Post will need platform OAuth integration (future)
