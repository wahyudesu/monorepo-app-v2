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
