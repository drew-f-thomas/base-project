import { z } from 'zod'
import Constants from 'expo-constants'

const EnvSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  SENTRY_DSN: z.string().optional(),
})

export type AppEnv = z.infer<typeof EnvSchema>

let cachedEnv: AppEnv | null = null

export function loadEnv(): AppEnv {
  if (cachedEnv) return cachedEnv

  // Get env from multiple sources
  const extra = Constants.expoConfig?.extra ?? {}

  const env = {
    EXPO_PUBLIC_API_URL:
      process.env.EXPO_PUBLIC_API_URL ?? extra.EXPO_PUBLIC_API_URL,
    SENTRY_DSN: process.env.SENTRY_DSN ?? extra.SENTRY_DSN,
  }

  const parsed = EnvSchema.safeParse(env)

  if (!parsed.success) {
    if (__DEV__) {
      console.error('Environment validation failed:')
      console.error(parsed.error.format())
      // In dev, use fallback values for easier development
      cachedEnv = {
        EXPO_PUBLIC_API_URL: 'https://api.example.com',
        SENTRY_DSN: undefined,
      }
      console.warn('Using fallback environment config in development')
      return cachedEnv
    }
    // In production, fail closed
    throw new Error('Invalid environment configuration')
  }

  cachedEnv = parsed.data
  return cachedEnv
}

// Helper to validate environment on app start
export function validateEnvironment() {
  try {
    const env = loadEnv()
    if (__DEV__) {
      console.log('Environment loaded successfully:', {
        EXPO_PUBLIC_API_URL: env.EXPO_PUBLIC_API_URL,
        SENTRY_DSN: env.SENTRY_DSN ? '[SET]' : '[NOT SET]',
      })
    }
  } catch (error) {
    console.error('Failed to load environment:', error)
    throw error
  }
}
