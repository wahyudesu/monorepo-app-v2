# Brand Stats Page Design

## Overview
Replace existing `/analytics/brand-stats` page with a 3-tab layout displaying comprehensive social media analytics.

## Date
2025-03-18

## Structure

```
/analytics/brand-stats
├── Summary Cards (5 cards - visible on all tabs)
├── Tabs Navigation
│   ├── Tab 1: Overview
│   ├── Tab 2: Audience
│   └── Tab 3: Content
```

## Tab 1: Overview

### Summary Cards (All Tabs)
- Total Followers (+12.5%)
- Total Impressions (+18.2%)
- Avg Engagement Rate (+0.6%)
- Viral Posts (+8)
- Avg Likes/Post (+18%)

### Charts

| Chart | Component | Description |
|-------|-----------|-------------|
| RingChart | Platform Goals | Monthly follower growth targets per platform |
| BarChart | Engagement Trend | Daily engagement over 7/30/90 days (selectable) |
| BarChart | Platform Comparison | Total followers comparison per platform |

## Tab 2: Audience

### Charts

| Chart | Component | Description |
|-------|-----------|-------------|
| BarChart | Age Distribution | Follower age groups (13-17, 18-24, 25-34, 35-44, 45-54, 55+) |
| BarChart | Gender Breakdown | Male, Female, Non-binary percentages |
| BarChart | Top Countries | Top 10 countries by follower count (horizontal) |
| BarChart | Active Hours | Engagement count by hour (00-23) |

## Tab 3: Content

### Charts

| Chart | Component | Description |
|-------|-----------|-------------|
| FunnelChart | Content Funnel | Impressions → Reach → Engagement → Clicks → Conversion |
| BarChart | Content Type Performance | Photo, Video, Reel, Carousel, Story (grouped) |
| SankeyChart | Traffic Flow | Platform → Website → Sign Up → Purchase |
| Card List | Top 5 Posts | Post cards with thumbnail, title, engagement metrics |

## Technical Decisions

### Chart Components
Use existing VisX-based components:
- `BarChart` - for most charts (vertical/horizontal, grouped, stacked)
- `RingChart` - for circular progress/goals
- `RadarChart` - for multi-metric comparison (optional)
- `FunnelChart` - for conversion funnels
- `SankeyChart` - for flow visualization

### Data Source
Add new mock data to `src/data/mock.ts`:
- `audienceAgeDistribution` - age group data
- `audienceGender` - gender breakdown
- `audienceCountries` - top countries
- `audienceActiveHours` - hourly engagement
- `contentTypePerformance` - metrics by content type
- `engagementTrendData` - daily engagement (7/30/90 days)

### File Structure
```
src/app/analytics/brand-stats/
├── page.tsx                    # Main page with tabs
├── components/
│   ├── BrandStatsTabs.tsx      # Tab navigation
│   ├── OverviewTab.tsx         # Tab 1 content
│   ├── AudienceTab.tsx         # Tab 2 content
│   └── ContentTab.tsx          # Tab 3 content
```

## Mock Data Structure

```typescript
// Age Distribution
interface AgeDistribution {
  ageGroup: string;
  count: number;
  percentage: number;
}

// Gender Breakdown
interface GenderBreakdown {
  gender: string;
  count: number;
  percentage: number;
}

// Top Countries
interface CountryData {
  country: string;
  code: string;
  followers: number;
  flag: string;
}

// Active Hours
interface HourlyEngagement {
  hour: number; // 0-23
  label: string; // "12:00", "13:00", etc
  engagement: number;
}

// Content Type Performance
interface ContentTypeData {
  type: string;
  posts: number;
  avgEngagement: number;
  totalLikes: number;
  totalShares: number;
}

// Engagement Trend
interface EngagementTrend {
  date: string;
  displayDate: string;
  likes: number;
  comments: number;
  shares: number;
  total: number;
}
```

## Implementation Notes

1. Use shadcn `Tabs` component for tab navigation
2. Summary cards persist across all tabs (outside tab content)
3. Date range selector (7/30/90 days) for Engagement Trend
4. Platform filter selector (optional, for filtering all charts)
5. Responsive layout: 1 column mobile, 2 columns tablet, 3 columns desktop where applicable
