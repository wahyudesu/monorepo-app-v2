/**
 * Accounts routes
 * Manage social media accounts
 */
export function createAccountsRoutes(fetch: <T>(path: string, options?: any) => Promise<T>) {
  return {
    /**
     * List all social accounts
     */
    list: (params?: { profileId?: string }) => {
      return fetch<any>('/v1/accounts', { query: params })
    },

    /**
     * Get a single account by ID
     */
    get: (accountId: string) => {
      return fetch<any>(`/v1/accounts/${accountId}`)
    },

    /**
     * Get follower statistics for an account
     */
    followerStats: (accountId: string, params?: { days?: number }) => {
      return fetch<any>(`/v1/accounts/${accountId}/followers/stats`, { query: params })
    },

    /**
     * Check account health/connection status
     */
    health: (accountId: string) => {
      return fetch<any>(`/v1/accounts/${accountId}/health`)
    },
  }
}

export type AccountsRoutes = ReturnType<typeof createAccountsRoutes>
