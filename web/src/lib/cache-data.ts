/**
 * Cached data utilities for Next.js Cache Components
 *
 * Note: 'use cache' directive requires Node.js runtime and doesn't work on Cloudflare Edge.
 * For Cloudflare Workers, we use a simpler pattern with in-memory caching during request lifetime.
 *
 * When migrating to a real API, replace mock data with actual fetch calls and use:
 * - Cloudflare KV for durable caching
 * - Cloudflare R2 for larger data blobs
 * - Cache API for HTTP response caching
 */

import {
	AnalyticsStats,
	analyticsData7d,
	analyticsData30d,
	analyticsData90d,
	analyticsPlatforms,
	analyticsStats7d,
	analyticsStats30d,
	analyticsStats90d,
	followersData7d,
	followersData30d,
	followersData90d,
	type AnalyticsPlatformConfig,
	type FollowersData,
	type PostAnalyticsData,
} from "@/data/mock";

// Simple in-memory cache for request lifetime (works on Edge)
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = {
	minutes: 60 * 1000,
	hours: 60 * 60 * 1000,
	days: 24 * 60 * 60 * 1000,
};

function get<T>(key: string, ttl: number, fetcher: () => T): T {
	const cached = cache.get(key);
	if (cached && Date.now() - cached.timestamp < ttl) {
		return cached.data as T;
	}
	const data = fetcher();
	cache.set(key, { data, timestamp: Date.now() });
	return data;
}

// Analytics data with caching (synchronous for mock data)
export function getAnalyticsData(timeRange: "7d" | "30d" | "90d" = "30d"): PostAnalyticsData[] {
	return get(
		`analytics-${timeRange}`,
		CACHE_TTL.minutes, // Cache for 1 minute
		() => {
			switch (timeRange) {
				case "7d":
					return analyticsData7d;
				case "30d":
					return analyticsData30d;
				case "90d":
					return analyticsData90d;
			}
		},
	);
}

export function getAnalyticsStats(timeRange: "7d" | "30d" | "90d" = "30d"): AnalyticsStats {
	return get(
		`analytics-stats-${timeRange}`,
		CACHE_TTL.minutes,
		() => {
			switch (timeRange) {
				case "7d":
					return analyticsStats7d;
				case "30d":
					return analyticsStats30d;
				case "90d":
					return analyticsStats90d;
			}
		},
	);
}

export function getFollowersData(timeRange: "7d" | "30d" | "90d" = "30d"): FollowersData[] {
	return get(
		`followers-${timeRange}`,
		CACHE_TTL.minutes,
		() => {
			switch (timeRange) {
				case "7d":
					return followersData7d;
				case "30d":
					return followersData30d;
				case "90d":
					return followersData90d;
			}
		},
	);
}

export function getPlatforms(): AnalyticsPlatformConfig[] {
	return get(
		"platforms",
		CACHE_TTL.hours, // Cache platforms longer (they rarely change)
		() => analyticsPlatforms,
	);
}

// Invalidate cache (call this when data changes)
export function invalidateAnalyticsCache(timeRange?: "7d" | "30d" | "90d") {
	if (timeRange) {
		cache.delete(`analytics-${timeRange}`);
		cache.delete(`analytics-stats-${timeRange}`);
		cache.delete(`followers-${timeRange}`);
	} else {
		// Clear all analytics cache
		for (const key of cache.keys()) {
			if (key.startsWith("analytics-") || key.startsWith("followers-") || key === "platforms") {
				cache.delete(key);
			}
		}
	}
}
