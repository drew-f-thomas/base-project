import { z } from 'zod'
import { loadEnv } from '@/src/config/env'
import {
  ApiError,
  NetworkError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ServerError,
} from './errors'

export interface RequestConfig extends RequestInit {
  token?: string
  timeout?: number
  retries?: number
}

/**
 * Main API client with Zod validation
 */
export async function api<T>(
  path: string,
  schema: z.ZodType<T>,
  config?: RequestConfig
): Promise<T> {
  const { EXPO_PUBLIC_API_URL } = loadEnv()
  const url = `${EXPO_PUBLIC_API_URL}${path}`

  const { token, timeout = 30000, retries = 0, ...fetchConfig } = config || {}

  const headers = new Headers(fetchConfig.headers)
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  let lastError: Error | undefined

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(url, {
        credentials: 'omit',
        ...fetchConfig,
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw await handleHttpError(response)
      }

      const text = await response.text()
      const json = text ? JSON.parse(text) : null
      const parsed = schema.safeParse(json)

      if (!parsed.success) {
        throw new ValidationError(
          'Response validation failed',
          parsed.error.format()
        )
      }

      return parsed.data
    } catch (error) {
      lastError = error as Error

      if (error instanceof Error && error.name === 'AbortError') {
        // convert into a retryable error and continue loop
        lastError = new NetworkError('Request timeout')
        if (attempt < retries) {
          await delay(Math.pow(2, attempt) * 1000)
          continue
        }
        throw lastError
      }

      if (attempt < retries && shouldRetry(error)) {
        await delay(Math.pow(2, attempt) * 1000) // Exponential backoff
        continue
      }

      throw error
    }
  }

  throw lastError || new ApiError('Request failed')
}

async function handleHttpError(response: Response): Promise<ApiError> {
  let message = response.statusText || 'Request failed'
  let details: any

  try {
    const errorBody = await response.json()
    message = errorBody.message || errorBody.error || message
    details = errorBody
  } catch {
    // Response body is not JSON
  }

  switch (response.status) {
    case 400:
      return new ValidationError(message, details)
    case 401:
      return new AuthenticationError(message)
    case 403:
      return new AuthorizationError(message)
    case 404:
      return new NotFoundError(message)
    case 500:
    case 502:
    case 503:
    case 504:
      return new ServerError(message)
    default:
      return new ApiError(message, 'HTTP_ERROR', response.status, details)
  }
}

function shouldRetry(error: unknown): boolean {
  if (error instanceof NetworkError) return true
  if (error instanceof ServerError) return true
  if (error instanceof ApiError && error.status && error.status >= 500)
    return true
  return false
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Convenience methods
export const apiGet = <T>(
  path: string,
  schema: z.ZodType<T>,
  config?: RequestConfig
) => api(path, schema, { ...config, method: 'GET' })

export const apiPost = <T>(
  path: string,
  schema: z.ZodType<T>,
  body?: any,
  config?: RequestConfig
) =>
  api(path, schema, {
    ...config,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  })

export const apiPut = <T>(
  path: string,
  schema: z.ZodType<T>,
  body?: any,
  config?: RequestConfig
) =>
  api(path, schema, {
    ...config,
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  })

export const apiDelete = <T>(
  path: string,
  schema: z.ZodType<T>,
  config?: RequestConfig
) => api(path, schema, { ...config, method: 'DELETE' })

// Example usage:
export async function getProfile(userId: string) {
  const { UserSchema } = await import('./schemas')
  return apiGet(`/users/${userId}`, UserSchema)
}
