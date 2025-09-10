import { ExpoSecureStorage } from '@/src/lib/storage/ExpoStorage'
import * as SecureStore from 'expo-secure-store'

// Mock expo-secure-store
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}))

const mockGetItemAsync = SecureStore.getItemAsync as jest.MockedFunction<
  typeof SecureStore.getItemAsync
>
const mockSetItemAsync = SecureStore.setItemAsync as jest.MockedFunction<
  typeof SecureStore.setItemAsync
>
const mockDeleteItemAsync = SecureStore.deleteItemAsync as jest.MockedFunction<
  typeof SecureStore.deleteItemAsync
>

describe('ExpoSecureStorage', () => {
  let storage: ExpoSecureStorage

  beforeEach(() => {
    storage = new ExpoSecureStorage()
    jest.clearAllMocks()
  })

  it('implements SecureStorage interface', () => {
    expect(storage.isSecure).toBe(true)
    expect(typeof storage.getItem).toBe('function')
    expect(typeof storage.setItem).toBe('function')
    expect(typeof storage.removeItem).toBe('function')
    expect(typeof storage.clear).toBe('function')
    expect(typeof storage.getAllKeys).toBe('function')
  })

  describe('getItem', () => {
    it('retrieves item successfully', async () => {
      const key = 'test-key'
      const value = 'test-value'
      mockGetItemAsync.mockResolvedValueOnce(value)

      const result = await storage.getItem(key)

      expect(result).toBe(value)
      expect(mockGetItemAsync).toHaveBeenCalledWith(key)
    })

    it('returns null for non-existent item', async () => {
      mockGetItemAsync.mockResolvedValueOnce(null)

      const result = await storage.getItem('non-existent')

      expect(result).toBeNull()
    })

    it('handles errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockGetItemAsync.mockRejectedValueOnce(new Error('Storage error'))

      const result = await storage.getItem('error-key')

      expect(result).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error getting item error-key:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })
  })

  describe('setItem', () => {
    it('stores item successfully', async () => {
      const key = 'test-key'
      const value = 'test-value'
      mockSetItemAsync.mockResolvedValueOnce()

      await storage.setItem(key, value)

      expect(mockSetItemAsync).toHaveBeenCalledWith(key, value)
    })

    it('throws error on storage failure', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const error = new Error('Storage full')
      mockSetItemAsync.mockRejectedValueOnce(error)

      await expect(storage.setItem('key', 'value')).rejects.toThrow(error)
      expect(consoleSpy).toHaveBeenCalledWith('Error setting item key:', error)

      consoleSpy.mockRestore()
    })
  })

  describe('removeItem', () => {
    it('removes item successfully', async () => {
      const key = 'test-key'
      mockDeleteItemAsync.mockResolvedValueOnce()

      await storage.removeItem(key)

      expect(mockDeleteItemAsync).toHaveBeenCalledWith(key)
    })

    it('throws error on removal failure', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const error = new Error('Removal failed')
      mockDeleteItemAsync.mockRejectedValueOnce(error)

      await expect(storage.removeItem('key')).rejects.toThrow(error)
      expect(consoleSpy).toHaveBeenCalledWith('Error removing item key:', error)

      consoleSpy.mockRestore()
    })
  })

  describe('clear', () => {
    it('logs warning for unsupported operation', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

      await storage.clear()

      expect(consoleSpy).toHaveBeenCalledWith(
        'Clear not fully implemented for SecureStore'
      )

      consoleSpy.mockRestore()
    })
  })

  describe('getAllKeys', () => {
    it('returns empty array and logs warning', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

      const result = await storage.getAllKeys()

      expect(result).toEqual([])
      expect(consoleSpy).toHaveBeenCalledWith(
        'getAllKeys not supported by SecureStore'
      )

      consoleSpy.mockRestore()
    })
  })

  describe('real-world usage scenarios', () => {
    it('handles typical token storage workflow', async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      mockSetItemAsync.mockResolvedValueOnce()
      mockGetItemAsync.mockResolvedValueOnce(token)
      mockDeleteItemAsync.mockResolvedValueOnce()

      // Store token
      await storage.setItem('auth_token', token)
      expect(mockSetItemAsync).toHaveBeenCalledWith('auth_token', token)

      // Retrieve token
      const retrievedToken = await storage.getItem('auth_token')
      expect(retrievedToken).toBe(token)

      // Remove token (logout)
      await storage.removeItem('auth_token')
      expect(mockDeleteItemAsync).toHaveBeenCalledWith('auth_token')
    })

    it('handles user preferences storage', async () => {
      const preferences = JSON.stringify({ theme: 'dark', notifications: true })
      mockSetItemAsync.mockResolvedValueOnce()
      mockGetItemAsync.mockResolvedValueOnce(preferences)

      await storage.setItem('user_preferences', preferences)
      const retrieved = await storage.getItem('user_preferences')

      expect(retrieved).toBe(preferences)
      expect(JSON.parse(retrieved!)).toEqual({
        theme: 'dark',
        notifications: true,
      })
    })
  })

  describe('error handling edge cases', () => {
    it('handles SecureStore unavailable scenarios', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockGetItemAsync.mockRejectedValueOnce(
        new Error('SecureStore is not available on this platform')
      )

      const result = await storage.getItem('test-key')

      expect(result).toBeNull()
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })
})
