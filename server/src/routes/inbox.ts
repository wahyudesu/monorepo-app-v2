/**
 * Inbox routes
 * Unified inbox for conversations, messages, comments, and reviews
 */
export function createInboxRoutes(fetch: <T>(path: string, options?: any) => Promise<T>) {
  return {
    /**
     * List conversations
     */
    conversations: (params?: { accountId?: string; platform?: string; page?: number; limit?: number }) => {
      return fetch<any>('/v1/inbox/conversations', { query: params })
    },

    /**
     * Get messages in a conversation
     */
    messages: (conversationId: string, params?: { page?: number; limit?: number }) => {
      return fetch<any>(`/v1/inbox/conversations/${conversationId}/messages`, { query: params })
    },

    /**
     * List comments
     */
    comments: (params?: { accountId?: string; page?: number; limit?: number }) => {
      return fetch<any>('/v1/inbox/comments', { query: params })
    },

    /**
     * List reviews
     */
    reviews: (params?: { accountId?: string; page?: number; limit?: number }) => {
      return fetch<any>('/v1/inbox/reviews', { query: params })
    },
  }
}

export type InboxRoutes = ReturnType<typeof createInboxRoutes>
