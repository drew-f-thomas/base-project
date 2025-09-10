/**
 * Analytics abstraction layer
 * No-op by default, implement specific providers as needed
 */

// Convenience hooks for React components
import { useEffect } from 'react'

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
}

export interface UserProperties {
  userId?: string
  email?: string
  [key: string]: any
}

class Analytics {
  private enabled = false

  initialize(config?: { enabled?: boolean }) {
    this.enabled = config?.enabled ?? false
    if (this.enabled && __DEV__) {
      console.log('Analytics initialized')
    }
  }

  track(event: string | AnalyticsEvent, properties?: Record<string, any>) {
    if (!this.enabled) return

    const eventData =
      typeof event === 'string' ? { name: event, properties } : event

    if (__DEV__) {
      console.log('[Analytics] Track:', eventData)
    }

    // Implement actual tracking here (e.g., Mixpanel, Amplitude, etc.)
  }

  identify(userId: string, properties?: UserProperties) {
    if (!this.enabled) return

    if (__DEV__) {
      console.log('[Analytics] Identify:', { userId, properties })
    }

    // Implement actual identification here
  }

  screen(name: string, properties?: Record<string, any>) {
    if (!this.enabled) return

    if (__DEV__) {
      console.log('[Analytics] Screen:', { name, properties })
    }

    // Implement actual screen tracking here
  }

  reset() {
    if (!this.enabled) return

    if (__DEV__) {
      console.log('[Analytics] Reset')
    }

    // Implement actual reset here
  }
}

export const analytics = new Analytics()

export function useScreenTracking(
  screenName: string,
  properties?: Record<string, any>
) {
  useEffect(() => {
    analytics.screen(screenName, properties)
  }, [screenName, properties])
}
