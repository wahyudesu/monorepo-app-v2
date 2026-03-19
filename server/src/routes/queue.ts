/**
 * Queue routes
 * Manage scheduling queue with time slots
 */
export function createQueueRoutes(fetch: <T>(path: string, options?: any) => Promise<T>) {
  return {
    /**
     * Get queue slots
     */
    slots: (profileId: string) => {
      return fetch<any>(`/v1/queue/${profileId}/slots`)
    },

    /**
     * Preview queue
     */
    preview: (profileId: string, params?: { startDate?: string; endDate?: string }) => {
      return fetch<any>(`/v1/queue/${profileId}/preview`, { query: params })
    },

    /**
     * Get next available slot
     */
    nextSlot: (profileId: string) => {
      return fetch<any>(`/v1/queue/${profileId}/next`)
    },
  }
}

export type QueueRoutes = ReturnType<typeof createQueueRoutes>
