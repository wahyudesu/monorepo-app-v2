/**
 * Connect routes
 * OAuth and social account connection
 */
export function createConnectRoutes(fetch: <T>(path: string, options?: any) => Promise<T>) {
  return {
    /**
     * Generate OAuth URL for connecting a social account
     */
    url: (params: { platform: string; redirectUri?: string; state?: string }) => {
      return fetch<any>('/v1/connect/url', { query: params })
    },
  }
}

export type ConnectRoutes = ReturnType<typeof createConnectRoutes>
