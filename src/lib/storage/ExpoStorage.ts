import * as SecureStore from 'expo-secure-store'
import { SecureStorage } from './Storage'

/**
 * Secure storage implementation using expo-secure-store
 * Use for sensitive data like tokens and credentials
 */
export class ExpoSecureStorage implements SecureStorage {
  readonly isSecure = true as const

  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key)
    } catch (error) {
      console.error(`Error getting item ${key}:`, error)
      return null
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value)
    } catch (error) {
      console.error(`Error setting item ${key}:`, error)
      throw error
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key)
    } catch (error) {
      console.error(`Error removing item ${key}:`, error)
      throw error
    }
  }

  async clear(): Promise<void> {
    // SecureStore doesn't have a clear method, so we'd need to track keys
    console.warn('Clear not fully implemented for SecureStore')
  }

  async getAllKeys(): Promise<string[]> {
    // SecureStore doesn't provide a way to get all keys
    console.warn('getAllKeys not supported by SecureStore')
    return []
  }
}
