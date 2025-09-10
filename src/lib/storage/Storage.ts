/**
 * Storage interface for abstraction over different storage backends
 */

export interface Storage {
  getItem(key: string): Promise<string | null>
  setItem(key: string, value: string): Promise<void>
  removeItem(key: string): Promise<void>
  clear?(): Promise<void>
  getAllKeys?(): Promise<string[]>
}

export interface SecureStorage extends Storage {
  // Marker interface for secure storage implementations
  readonly isSecure: true
}
