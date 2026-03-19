/**
 * Cached data fetchers for analytics - server components
 * These can be prerendered and cached with PPR
 */
import { Suspense } from "react";
import { AnalyticsStats } from "./AnalyticsStats";
import { getAnalyticsData, getAnalyticsStats, getFollowersData, getPlatforms } from "@/lib/cache-data";
import type { PostAnalyticsData, AnalyticsPlatformConfig, FollowersData } from "@/data/mock";

interface CachedAnalyticsStatsProps {
	timeRange: "7d" | "30d" | "90d";
}

function StatsFetcher({ timeRange }: { timeRange: "7d" | "30d" | "90d" }) {
	const stats = getAnalyticsStats(timeRange);
	return <AnalyticsStats stats={stats} />;
}

export function CachedAnalyticsStats({ timeRange }: CachedAnalyticsStatsProps) {
	return (
		<Suspense fallback={<StatsSkeleton />}>
			<StatsFetcher timeRange={timeRange} />
		</Suspense>
	);
}

function StatsSkeleton() {
	return (
		<div className="flex overflow-x-auto pb-2">
			{[0, 1, 2, 3, 4].map((index) => (
				<div
					key={index}
					className={`flex-1 min-w-[100px] space-y-2 ${
						index === 0 ? "pr-4 border-r border-border" :
						index > 0 && index < 4 ? "px-4 border-r border-border" :
						"pl-4"
					}`}
				>
					<div className="h-3 w-20 bg-muted/50 rounded animate-pulse" />
					<div className="h-7 w-16 bg-muted/50 rounded animate-pulse" />
					<div className="h-5 w-12 rounded-full bg-muted/50 animate-pulse" />
				</div>
			))}
		</div>
	);
}

// Cached data fetcher for chart data (synchronous)
export function ChartDataFetcher(timeRange: "7d" | "30d" | "90d"): {
	data: PostAnalyticsData[];
	platforms: AnalyticsPlatformConfig[];
	followersData: FollowersData[];
} {
	const data = getAnalyticsData(timeRange);
	const platforms = getPlatforms();
	const followersData = getFollowersData(timeRange);
	return { data, platforms, followersData };
}
