import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsTabs } from "./AnalyticsTabs";
import { AnalyticsStats } from "./components/AnalyticsStats";
import { getAnalyticsStats } from "@/lib/cache-data";
import { PublishedPostsTab } from "./components/PublishedPostsTab";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Analytics - Social Media Dashboard",
	description: "Track your posting performance across all platforms",
};

// Default time range for initial render
const DEFAULT_TIME_RANGE = "30d" as const;

/**
 * Analytics page - Server Component with PPR
 *
 * Static shell (header, initial stats) is prerendered
 * Dynamic content (charts, tabs) streams in via Suspense
 */
export default function AnalyticsPage() {
	// Fetch initial stats server-side (synchronous, cached)
	const initialStats = getAnalyticsStats(DEFAULT_TIME_RANGE);

	return (
		<div className="mx-auto max-w-6xl space-y-6">
			{/* Static Header - instant from CDN */}
			<div>
				<h1 className="font-display text-2xl font-bold tracking-tight">
					Social Media Analytics
				</h1>
				<p className="text-sm text-muted-foreground">
					Track your posting performance across all platforms
				</p>
			</div>

			{/* Cached Stats - prerendered with data */}
			<AnalyticsStats stats={initialStats} />

			{/* Tabs - client component for interactivity */}
			<AnalyticsTabs defaultTimeRange={DEFAULT_TIME_RANGE} />

			{/* Published Posts Section - server component */}
			<Card className="border-border/50 shadow-sm">
				<CardHeader className="pb-4">
					<CardTitle className="font-display text-base font-semibold">
						Published Posts
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Suspense
						fallback={
							<div className="space-y-4 animate-pulse">
								<div className="h-6 w-40 bg-muted rounded" />
								<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
									{[
										"skeleton-1", "skeleton-2", "skeleton-3",
										"skeleton-4", "skeleton-5", "skeleton-6"
									].map((id) => (
										<div key={id} className="h-48 bg-muted/20 rounded-lg" />
									))}
								</div>
							</div>
						}
					>
						<PublishedPostsTab selectedPlatform="instagram" />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	);
}
