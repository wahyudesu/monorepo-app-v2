/**
 * Posts routes
 * Create, list, update, delete, retry, unpublish posts
 */
export function createPostsRoutes(fetch: <T>(path: string, options?: any) => Promise<T>) {
  return {
    /**
     * List posts with pagination
     */
    list: (params: { page?: number; limit?: number; profileId?: string } = {}) => {
      return fetch<any>('/v1/posts', { query: params })
    },

    /**
     * Get a single post by ID
     */
    get: (postId: string) => {
      return fetch<any>(`/v1/posts/${postId}`)
    },

    /**
     * Create a new post
     */
    create: (data: {
      profileId: string
      text: string
      socialAccountIds: string[]
      scheduledAt?: string
      media?: Array<{ url: string; type?: string; altText?: string }>
      thread?: Array<{ text: string; media?: Array<{ url: string }> }>
    }) => {
      return fetch<any>('/v1/posts', { method: 'POST', body: data })
    },

    /**
     * Update a post
     */
    update: (postId: string, data: {
      text?: string
      scheduledAt?: string
      media?: Array<{ url: string; type?: string; altText?: string }>
    }) => {
      return fetch<any>(`/v1/posts/${postId}`, { method: 'PATCH', body: data })
    },

    /**
     * Delete a post
     */
    delete: (postId: string) => {
      return fetch<any>(`/v1/posts/${postId}`, { method: 'DELETE' })
    },

    /**
     * Retry a failed post
     */
    retry: (postId: string) => {
      return fetch<any>(`/v1/posts/${postId}/retry`, { method: 'POST' })
    },

    /**
     * Unpublish a published post
     */
    unpublish: (postId: string) => {
      return fetch<any>(`/v1/posts/${postId}/unpublish`, { method: 'POST' })
    },
  }
}

export type PostsRoutes = ReturnType<typeof createPostsRoutes>
