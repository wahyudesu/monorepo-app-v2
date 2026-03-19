"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedTabs } from "@/components/ui";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type TimeRange = "7d" | "30d" | "90d";

interface AnalyticsTabsProps {
	defaultTimeRange: TimeRange;
}

/**
 * Client component for tab switching and time range filtering
 * Delegates content rendering to server components via children
 */
export function AnalyticsTabs({ defaultTimeRange }: AnalyticsTabsProps) {
	const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange);
	const [activeTab, setActiveTab] = useState("overview");

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between gap-4">
				<AnimatedTabs
					activeTab={activeTab}
					onChange={setActiveTab}
					tabs={[
						{ id: "overview", label: "Overview" },
						{ id: "platforms", label: "Details" },
					]}
					variant="pill"
				/>

				{/* Time Range Filter */}
				<div className="inline-flex items-center rounded-lg bg-muted/50 p-1">
					{[
						{ value: "7d" as const, label: "7D" },
						{ value: "30d" as const, label: "30D" },
						{ value: "90d" as const, label: "90D" },
					].map((range) => (
						<Button
							key={range.value}
							variant="ghost"
							size="sm"
							onClick={() => setTimeRange(range.value)}
							className={cn(
								"h-8 rounded-md px-3 text-sm font-medium transition-all",
								timeRange === range.value
									? "bg-background shadow-sm text-foreground"
									: "text-muted-foreground hover:text-foreground",
							)}
						>
							{range.label}
						</Button>
					))}
				</div>
			</div>

			{/* Animated Tab Content */}
			<AnimatePresence mode="wait">
				<motion.div
					key={`${activeTab}-${timeRange}`}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
				>
					{activeTab === "overview" && (
						<OverviewTabContent timeRange={timeRange} />
					)}

					{activeTab === "platforms" && (
						<PlatformsTabContent />
					)}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}

// Server component wrapper for Overview tab (fetches data server-side)
function OverviewTabContent({ timeRange }: { timeRange: TimeRange }) {
	return (
		<div className="space-y-6">
			<OverviewTabContentWithData timeRange={timeRange} />
		</div>
	);
}

async function OverviewTabContentWithData({ timeRange }: { timeRange: TimeRange }) {
	const { OverviewTab } = await import("./components/OverviewTab");
	const { ChartDataFetcher } = await import("./components/CachedAnalyticsData");
	const chartData = ChartDataFetcher(timeRange);

	// OverviewTab is a client component, so we pass data to it
	return <OverviewTab data={chartData.data} platforms={chartData.platforms} followersData={chartData.followersData} />;
}

// Server component wrapper for Platforms tab
async function PlatformsTabContent() {
	const { PlatformsTab } = await import("./components/PlatformsTab");
	return <PlatformsTab />;
}
