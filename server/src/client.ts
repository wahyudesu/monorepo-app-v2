import type { paths } from './types'
import { createPostsRoutes, type PostsRoutes } from './routes/posts'
import { createAccountsRoutes, type AccountsRoutes } from './routes/accounts'
import { createAnalyticsRoutes, type AnalyticsRoutes } from './routes/analytics'
import { createToolsRoutes, type ToolsRoutes } from './routes/tools'
import { createInboxRoutes, type InboxRoutes } from './routes/inbox'
import { createProfilesRoutes, type ProfilesRoutes } from './routes/profiles'
import { createUsersRoutes, type UsersRoutes } from './routes/users'
import { createQueueRoutes, type QueueRoutes } from './routes/queue'
import { createWebhooksRoutes, type WebhooksRoutes } from './routes/webhooks'
import { createMediaRoutes, type MediaRoutes } from './routes/media'
import { createUsageRoutes, type UsageRoutes } from './routes/usage'
import { createConnectRoutes, type ConnectRoutes } from './routes/connect'

export interface ZernioClientConfig {
  apiKey: string
  baseUrl?: string
}

type FetchOptions = {
  method?: string
  query?: Record<string, string | string[] | undefined>
  body?: any
}

/**
 * Zernio API Client
 *
 * A typed client for the Zernio Social Media API.
 * Provides methods for posts, accounts, analytics, and more.
 */
export class ZernioClient {
  private apiKey: string
  private baseUrl: string

  // Route modules
  public readonly posts: PostsRoutes
  public readonly accounts: AccountsRoutes
  public readonly analytics: AnalyticsRoutes
  public readonly tools: ToolsRoutes
  public readonly inbox: InboxRoutes
  public readonly profiles: ProfilesRoutes
  public readonly users: UsersRoutes
  public readonly queue: QueueRoutes
  public readonly webhooks: WebhooksRoutes
  public readonly media: MediaRoutes
  public readonly usage: UsageRoutes
  public readonly connect: ConnectRoutes

  constructor(config: ZernioClientConfig) {
    this.apiKey = config.apiKey
    this.baseUrl = config.baseUrl || 'https://zernio.com/api'

    // Initialize all routes with the fetch method
    const fetchMethod = this.fetch.bind(this)

    this.posts = createPostsRoutes(fetchMethod)
    this.accounts = createAccountsRoutes(fetchMethod)
    this.analytics = createAnalyticsRoutes(fetchMethod)
    this.tools = createToolsRoutes(fetchMethod)
    this.inbox = createInboxRoutes(fetchMethod)
    this.profiles = createProfilesRoutes(fetchMethod)
    this.users = createUsersRoutes(fetchMethod)
    this.queue = createQueueRoutes(fetchMethod)
    this.webhooks = createWebhooksRoutes(fetchMethod)
    this.usage = createUsageRoutes(fetchMethod)
    this.connect = createConnectRoutes(fetchMethod)
    this.media = createMediaRoutes(this.baseUrl, this.apiKey)
  }

  private async fetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
    const url = new URL(path, this.baseUrl)

    // Add query parameters
    if (options.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        if (value === undefined) return
        if (Array.isArray(value)) {
          value.forEach(v => url.searchParams.append(key, v))
        } else {
          url.searchParams.set(key, value)
        }
      })
    }

    const headers: HeadersInit = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    }

    const response = await fetch(url.toString(), {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }))
      const errorMessage = (error && typeof error === 'object' && 'error' in error)
        ? error.error
        : (error && typeof error === 'object' && 'message' in error)
          ? error.message
          : 'API request failed'
      throw new Error(String(errorMessage))
    }

    return response.json()
  }

  /**
   * Get API base URL
   */
  get url(): string {
    return this.baseUrl
  }
}

// Export all route types
export type {
  PostsRoutes,
  AccountsRoutes,
  AnalyticsRoutes,
  ToolsRoutes,
  InboxRoutes,
  ProfilesRoutes,
  UsersRoutes,
  QueueRoutes,
  WebhooksRoutes,
  MediaRoutes,
  UsageRoutes,
  ConnectRoutes,
}

export type { paths }
