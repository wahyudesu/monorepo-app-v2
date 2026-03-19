/**
 * Webhooks routes
 * Configure and manage webhooks for real-time notifications
 */
export function createWebhooksRoutes(fetch: <T>(path: string, options?: any) => Promise<T>) {
  return {
    /**
     * List all webhooks
     */
    list: () => {
      return fetch<any>('/v1/webhooks')
    },

    /**
     * Get a single webhook
     */
    get: (webhookId: string) => {
      return fetch<any>(`/v1/webhooks/${webhookId}`)
    },

    /**
     * Create a webhook
     */
    create: (data: {
      name: string
      url: string
      events: string[]
      secret?: string
      customHeaders?: Record<string, string>
    }) => {
      return fetch<any>('/v1/webhooks', { method: 'POST', body: data })
    },

    /**
     * Update a webhook
     */
    update: (webhookId: string, data: {
      name?: string
      url?: string
      events?: string[]
      isActive?: boolean
      customHeaders?: Record<string, string>
    }) => {
      return fetch<any>(`/v1/webhooks/${webhookId}`, { method: 'PATCH', body: data })
    },

    /**
     * Delete a webhook
     */
    delete: (webhookId: string) => {
      return fetch<any>(`/v1/webhooks/${webhookId}`, { method: 'DELETE' })
    },

    /**
     * Test a webhook
     */
    test: (webhookId: string) => {
      return fetch<any>(`/v1/webhooks/${webhookId}/test`, { method: 'POST' })
    },

    /**
     * Get webhook logs
     */
    logs: (webhookId?: string, params?: { page?: number; limit?: number }) => {
      if (webhookId) {
        return fetch<any>(`/v1/webhooks/${webhookId}/logs`, { query: params })
      }
      return fetch<any>('/v1/webhooks/logs', { query: params })
    },
  }
}

export type WebhooksRoutes = ReturnType<typeof createWebhooksRoutes>
