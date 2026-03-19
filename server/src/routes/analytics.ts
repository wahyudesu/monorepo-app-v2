/**
 * Analytics routes
 * Get account and content analytics
 */
export function createAnalyticsRoutes(fetch: <T>(path: string, options?: any) => Promise<T>) {
  return {
    /**
     * Get analytics for an account
     */
    get: (accountId: string, params?: { startDate?: string; endDate?: string }) => {
      return fetch<any>(`/v1/analytics/${accountId}`, { query: params })
    },

    /**
     * Get daily views for YouTube videos
     */
    dailyViews: (accountId: string, params: { videoId: string; startDate?: string; endDate?: string }) => {
      return fetch<any>(`/v1/analytics/${accountId}/youtube/daily/views`, { query: params })
    },

    /**
     * Get daily metrics
     */
    dailyMetrics: (accountId: string, params?: { startDate?: string; endDate?: string; metric?: string }) => {
      return fetch<any>(`/v1/analytics/${accountId}/daily`, { query: params })
    },

    /**
     * Get best time to post
     */
    bestTime: (accountId: string) => {
      return fetch<any>(`/v1/analytics/${accountId}/bestTime`)
    },
  }
}

export type AnalyticsRoutes = ReturnType<typeof createAnalyticsRoutes>
