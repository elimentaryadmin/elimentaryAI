export interface RateLimitOptions {
  uniqueTokenPerInterval?: number
  interval?: number
  limit: number
}

export function rateLimit(options: RateLimitOptions) {
  const { limit, interval = 60000, uniqueTokenPerInterval = 500 } = options
  const tokenCache = new Map<string, number[]>()

  return {
    check: (tokens: number, key: string): Promise<void> => {
      const now = Date.now()
      const windowStart = now - interval

      const cachedTokens = tokenCache.get(key) || []
      const validTokens = cachedTokens.filter((timestamp) => timestamp > windowStart)

      if (validTokens.length + tokens > limit) {
        const error: any = new Error("Rate limit exceeded")
        error.statusCode = 429
        throw error
      }

      // Add new tokens
      for (let i = 0; i < tokens; i++) {
        validTokens.push(now)
      }

      tokenCache.set(key, validTokens)

      // Clean up old entries
      if (tokenCache.size > uniqueTokenPerInterval) {
        const oldestKey = [...tokenCache.entries()].sort(([, a], [, b]) => a[0] - b[0])[0][0]
        tokenCache.delete(oldestKey)
      }

      return Promise.resolve()
    },
  }
}

