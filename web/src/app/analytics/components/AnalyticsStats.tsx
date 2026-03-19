/**
 * Server component for analytics stats - can be prerendered with PPR
 * Receives data as props to avoid async operations in the component
 */
import type { AnalyticsStats } from "@/data/mock";
import { SummaryCard } from "./SummaryCard";

interface AnalyticsStatsProps {
	stats: AnalyticsStats;
}

function formatNumber(num: number): string {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + "M";
	} else if (num >= 1000) {
		return (num / 1000).toFixed(1) + "K";
	}
	return num.toLocaleString();
}

export function AnalyticsStats({ stats }: AnalyticsStatsProps) {
	return (
		<div className="flex overflow-x-auto pb-2">
			<div className="flex-1 min-w-[100px] pr-4 border-r border-border">
				<SummaryCard
					title="Impressions"
					value={formatNumber(stats.impressions.value)}
					trend={{
						value: stats.impressions.trend,
						direction: "up",
					}}
				/>
			</div>
			<div className="flex-1 min-w-[100px] px-4 border-r border-border">
				<SummaryCard
					title="Engagements"
					value={formatNumber(stats.engagements.value)}
					trend={{
						value: stats.engagements.trend,
						direction: "up",
					}}
				/>
			</div>
			<div className="flex-1 min-w-[100px] px-4 border-r border-border">
				<SummaryCard
					title="Likes"
					value={formatNumber(stats.likes.value)}
					trend={{
						value: stats.likes.trend,
						direction: "up",
					}}
				/>
			</div>
			<div className="flex-1 min-w-[100px] px-4 border-r border-border">
				<SummaryCard
					title="Profile Visits"
					value={formatNumber(stats.profileVisits.value)}
					trend={{ value: stats.profileVisits.trend, direction: "up" }}
				/>
			</div>
			<div className="flex-1 min-w-[100px] pl-4">
				<SummaryCard
					title="Replies"
					value={formatNumber(stats.replies.value)}
					trend={{
						value: stats.replies.trend,
						direction: "up",
					}}
				/>
			</div>
		</div>
	);
}
