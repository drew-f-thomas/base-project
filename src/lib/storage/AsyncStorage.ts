import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { Storage } from './Storage'

export class AsyncKVStorage implements Storage {
  async getItem(key: string): Promise<string | null> {
    return AsyncStorageLib.getItem(key)
  }
  async setItem(key: string, value: string): Promise<void> {
    return AsyncStorageLib.setItem(key, value)
  }
  async removeItem(key: string): Promise<void> {
    return AsyncStorageLib.removeItem(key)
  }
  async clear(): Promise<void> {
    return AsyncStorageLib.clear()
  }
  async getAllKeys(): Promise<string[]> {
    const keys = await AsyncStorageLib.getAllKeys()
    return [...keys]
  }
}
