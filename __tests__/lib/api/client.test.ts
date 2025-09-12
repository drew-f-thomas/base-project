import { z } from 'zod'
import { api, apiGet, apiPost, apiPut, apiDelete } from '@/src/lib/api/client'
import {
  ApiError,
  NetworkError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ServerError,
} from '@/src/lib/api/errors'

// Mock the environment loader
jest.mock('@/src/config/env', () => ({
  loadEnv: () => ({
    EXPO_PUBLIC_API_URL: 'https://api.test.com',
  }),
}))

// Mock fetch
global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockFetch.mockClear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('api function', () => {
    const TestSchema = z.object({
      id: z.number(),
      name: z.string(),
    })

    it('makes successful API call', async () => {
      const mockResponse = { id: 1, name: 'Test' }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await api('/test', TestSchema)

      expect(result).toEqual(mockResponse)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          headers: expect.any(Headers),
        })
      )
    })

    it('includes authorization header when token provided', async () => {
      const mockResponse = { id: 1, name: 'Test' }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      await api('/test', TestSchema, { token: 'test-token' })

      const [, config] = mockFetch.mock.calls[0]
      const headers = config?.headers as Headers
      expect(headers.get('Authorization')).toBe('Bearer test-token')
    })

    it('sets content-type header', async () => {
      const mockResponse = { id: 1, name: 'Test' }
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      await api('/test', TestSchema)

      const [, config] = mockFetch.mock.calls[0]
      const headers = config?.headers as Headers
      expect(headers.get('Content-Type')).toBe('application/json')
    })

    it('throws ValidationError on invalid response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ invalid: 'data' }),
      } as Response)

      await expect(api('/test', TestSchema)).rejects.toThrow(ValidationError)
    })

    it('handles network timeout', async () => {
      const abortError = new Error('AbortError')
      abortError.name = 'AbortError'
      mockFetch.mockRejectedValueOnce(abortError)

      await expect(api('/test', TestSchema, { timeout: 100 })).rejects.toThrow(
        NetworkError
      )
    })

    it('retries on server errors', async () => {
      mockFetch
        .mockRejectedValueOnce(new ServerError('Server Error'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ id: 1, name: 'Test' }),
        } as Response)

      const result = await api('/test', TestSchema, { retries: 1 })

      expect(result).toEqual({ id: 1, name: 'Test' })
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    it('handles HTTP error responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({}),
      } as Response)

      await expect(api('/test', TestSchema)).rejects.toThrow(NotFoundError)
    })
  })

  describe('HTTP error handling', () => {
    const TestSchema = z.object({ test: z.string() })

    it('handles 400 validation error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ message: 'Validation failed' }),
      } as Response)

      await expect(api('/test', TestSchema)).rejects.toThrow(ValidationError)
    })

    it('handles 401 authentication error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ message: 'Unauthorized' }),
      } as Response)

      await expect(api('/test', TestSchema)).rejects.toThrow(
        AuthenticationError
      )
    })

    it('handles 403 authorization error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => ({ message: 'Forbidden' }),
      } as Response)

      await expect(api('/test', TestSchema)).rejects.toThrow(AuthorizationError)
    })

    it('handles 500 server error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Internal Server Error' }),
      } as Response)

      await expect(api('/test', TestSchema)).rejects.toThrow(ServerError)
    })

    it('handles generic HTTP error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 418,
        statusText: "I'm a teapot",
        json: async () => ({}),
      } as Response)

      await expect(api('/test', TestSchema)).rejects.toThrow(ApiError)
    })
  })

  describe('convenience methods', () => {
    const TestSchema = z.object({ success: z.boolean() })

    it('apiGet makes GET request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      await apiGet('/test', TestSchema)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'GET',
        })
      )
    })

    it('apiPost makes POST request with body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      const body = { data: 'test' }
      await apiPost('/test', TestSchema, body)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(body),
        })
      )
    })

    it('apiPut makes PUT request with body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      const body = { data: 'test' }
      await apiPut('/test', TestSchema, body)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(body),
        })
      )
    })

    it('apiDelete makes DELETE request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      await apiDelete('/test', TestSchema)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'DELETE',
        })
      )
    })
  })

  describe('error handling edge cases', () => {
    const TestSchema = z.object({ test: z.string() })

    it('handles non-JSON error response', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => {
          throw new Error('Not JSON')
        },
      }
      mockFetch.mockResolvedValueOnce(mockResponse as any)

      await expect(api('/test', TestSchema)).rejects.toThrow(ServerError)
    })

    it('handles response with custom error message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Custom error message' }),
      } as Response)

      try {
        await api('/test', TestSchema)
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError)
        expect((error as ValidationError).message).toBe('Custom error message')
      }
    })
  })
})
