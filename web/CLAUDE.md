# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a social media content management dashboard built with Next.js 16, React 19, and Tailwind CSS v4. The app allows users to create, schedule, and analyze social media posts across multiple platforms (Instagram, TikTok, Twitter, LinkedIn, Threads). It features an AI-powered content generator and comprehensive analytics dashboard.

## Development Commands

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint

# Cloudflare deployment
pnpm deploy       # Build and deploy to Cloudflare
pnpm upload       # Build and upload
pnpm preview      # Build and preview locally

# Generate Cloudflare types
pnpm cf-typegen
```

## Architecture

### Deployment Target
- **Platform**: Cloudflare Workers/Pages via OpenNext.js
- **Config**: `open-next.config.ts` - minimal setup with R2 cache disabled by default
- **Local dev**: The app uses `initOpenNextCloudflareForDev()` to enable Cloudflare context during development

### Key Technologies
- **Next.js**: 16.1.5 with App Router
- **React**: 19.1.5
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui (base-maia style), HugeIcons for icons
- **Charts**: VisX for analytics visualizations
- **Fonts**: Figtree (Google), OpenRunde (local)

### Directory Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── analytics/    # Analytics dashboard with platform/brand stats
│   ├── ai/           # AI content generator
│   ├── post/         # Calendar and content scheduling
│   ├── inbox/        # Messages/notifications
│   ├── tools/        # Additional tools
│   └── settings/     # App settings
├── components/
│   ├── ai/           # AI generator components
│   ├── calendar/     # Calendar grid for scheduling
│   ├── charts/       # Custom chart components
│   ├── layout/       # App shell (header, nav)
│   ├── loading/      # Skeleton loaders
│   ├── post/         # Post-related components
│   ├── settings/     # Settings page components
│   └── ui/           # shadcn/ui components
├── data/
│   └── mock.ts       # Mock data for development
├── hooks/            # Custom React hooks
├── lib/
│   ├── constants/    # App constants (platforms, tones, etc.)
│   ├── types/        # TypeScript type definitions
│   └── utils.ts      # Utility functions
```

## Key Patterns

### Client Components
Most pages use `"use client"` for interactivity. The root layout wraps everything in necessary providers (Tooltip, Toaster).

### Navigation
- Expandable bottom nav (`ExpandableNav`) with keyboard shortcuts: Ctrl/Cmd + 1-6
- Routes: /post, /inbox, /analytics, /ai, /tools, /settings
- Nav hides on sub-pages (e.g., /analytics/brand-stats)

### Data Flow
- Currently uses mock data from `src/data/mock.ts`
- Types are centralized in `src/lib/types/`
- Constants (platforms, tones, goals) in `src/lib/constants/`

### Theme System
- Uses Tailwind CSS v4 with `@theme inline` and CSS custom properties
- Light/dark mode via `next-themes`
- Colors defined in `src/app/globals.css` using oklch color space

### Styling Conventions
- `bg-background`, `text-foreground` for base colors
- `bg-muted`, `text-muted-foreground` for secondary content
- `border-border` for borders
- `rounded-3xl` for cards/dialogs
- Prefix button classes: `cursor-pointer` for interactive elements

### Composer Component
The `Composer` component (`src/components/ui/composer.tsx`) is a reusable input with:
- Slash commands for tools
- File attachment via `FilePreview`
- Tone selector for AI generation
- Context options dropdown
- Auto-expanding textarea

## Pages

### `/post` - Content Calendar & Scheduling
Central hub for planning, scheduling, and managing social media content across all platforms. This page provides a comprehensive calendar interface with multiple viewing options to suit different workflows.

**Key Features:**
- **Calendar View**: Full monthly calendar with draggable events, week view alternative for focused planning
- **View Modes**: Switch between Calendar, Grid (card-based), Kanban (status columns), and List views
- **Drag & Drop**: Move scheduled posts between dates by dragging events
- **Platform Filter**: Filter events by specific platform (Instagram, TikTok, Twitter, LinkedIn, etc.) or view all
- **Event Management**: Click any event to open detail dialog, click empty date to create new content
- **Navigation Controls**: Previous/next month or week navigation with date display
- **Timezone Support**: All dates stored in ISO format for consistency

**Components Used:**
- `PostHeader` - Page header with title
- `PostControls` - View mode toggles, calendar navigation, platform filter
- `CalendarGrid` - Interactive calendar with day cells
- `PostCardsView`, `KanbanView`, `ListView` - Alternative content views
- `EventDetailDialog`, `CreateContentDialog` - CRUD dialogs

### `/inbox` - Messages & Automation
Unified inbox for managing all incoming messages and comments from connected social platforms. Designed for efficient customer engagement with automation capabilities.

**Key Features:**
- **Unified Inbox**: All messages and comments from all platforms in one place
- **Platform Filtering**: Quick filter by Instagram, TikTok, Twitter, YouTube
- **Customer Labels**: Tag contacts as VIP, Lead, Customer, or Partner for CRM functionality
- **Star & Priority**: Mark important conversations for quick access
- **Online Status**: See which contacts are currently online
- **Search**: Full-text search across conversations
- **Sort Options**: Sort by newest or by name
- **Message Types**: Toggle between messages and comments
- **Chat Interface**: Full messaging UI with send button, attachments, emoji
- **Automation Tab**: Configure auto-reply rules and workflow automation
- **Responsive Design**: Mobile-optimized with slide-over chat view

**Components Used:**
- `AnimatedTabs` - Switch between Inbox and Automation
- `ScrollArea` - Scrollable conversation list and chat area
- `PlatformFilterDropdown` - Platform selection filter

### `/analytics` - Social Media Analytics
Comprehensive analytics dashboard providing insights into social media performance across all connected platforms. Combines high-level metrics with detailed breakdowns.

**Key Features:**
- **Summary Cards**: At-a-glance metrics for Impressions, Engagements, Likes, Profile Visits, Replies with trend indicators
- **Time Range Selection**: Switch between 7-day, 30-day, and 90-day views
- **Overview Tab**: Line charts showing engagement trends, follower growth, and platform comparison
- **Platforms Tab**: Detailed breakdown per platform with individual performance metrics
- **Published Posts Section**: Grid view of all published content with engagement stats
- **Animated Transitions**: Smooth content transitions between tabs and time ranges
- **Loading States**: Skeleton loaders during data fetches
- **Lazy Loading**: Heavy tab components loaded dynamically for performance

**Components Used:**
- `AnimatedTabs` - Main tab switcher (Overview, Details)
- `SummaryCard` - Metric cards with trend indicators
- `ChartSkeleton` - Loading placeholder for charts

### `/analytics/brand-stats` - Brand Statistics
Deep-dive analytics page providing granular insights into brand performance, audience demographics, and content effectiveness.

**Key Features:**
- **Audience Tab**: Demographics data, follower growth patterns, audience insights
- **Content Tab**: Top performing posts, content type analysis, engagement by format
- **Funnel Tab**: Conversion tracking from awareness to action
- **Animated Tabs**: Smooth pill-style tab switcher with highlight animation
- **Back Navigation**: Quick return to main analytics page
- **Motion Animations**: Content fades in/out when switching tabs

**Components Used:**
- `BrandStatsTabs` - Custom tabs wrapper using AnimatedTabs
- `AnimatePresence` - Tab content transition animations

### `/ai` - AI Content Generator
AI-powered content creation assistant that helps generate platform-optimized social media posts using natural language prompts.

**Key Features:**
- **Tone Selection**: Choose from professional, casual, friendly, urgent, etc.
- **Platform Optimization**: Content tailored for specific social platforms
- **Template Manager**: Save and reuse prompt templates for consistency
- **Slash Commands**: Quick access to AI tools from composer
- **Auto-expanding Input**: Textarea that grows with content
- **Context Options**: Additional context and instructions for AI
- **File Attachments**: Upload images or reference materials
- **Real-time Generation**: See AI content as it's generated

**Components Used:**
- `Composer` - Main input with slash commands, file preview, tone selector
- `TemplateManagerDialog` - Template CRUD operations

### `/tools` - Utility Tools
Collection of productivity tools and utilities for content management and social media workflows.

**Key Features:**
- Content script engine for batch operations
- Platform-specific utilities
- Integration tools with external services

### `/settings` - App Settings
Configuration page for managing account settings, platform connections, notifications, and integrations.

**Key Features:**
- Account profile management
- Connected platform accounts
- Notification preferences
- API integrations
- Theme and display settings
- Data export options

## Platform Types

The app supports these social media platforms:
- Primary: `threads`, `linkedin`, `twitter`, `instagram`, `tiktok`
- Also: `youtube`, `facebook`, `pinterest`, `whatsapp`, `reddit`, `bluesky`, `google`, `telegram`, `snapchat`

Platform colors and icons are defined in `src/lib/constants.ts` and `src/components/social/PlatformIcon.tsx`.

## Important Notes

- **TypeScript**: Strict mode is disabled (`strict: false` in tsconfig.json)
- **Path aliases**: `@/*` maps to `./src/*`
- **Deploy target**: Always consider Cloudflare Workers environment when adding server-side code
- **No API routes currently**: The app uses client-side mock data
- **Monorepo**: This is the `web` folder within a larger monorepo structure
