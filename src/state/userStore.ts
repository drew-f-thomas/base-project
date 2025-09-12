/**
 * User store for persisting non-sensitive user data.
 *
 * IMPORTANT: This store should NEVER contain sensitive data like:
 * - Access tokens
 * - Refresh tokens
 * - API keys
 * - Passwords
 *
 * Sensitive auth data should be stored in SecureStore via auth.ts.
 * This store only contains basic user profile info that's safe to persist.
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { User } from '@/src/lib/api/schemas'

interface UserState {
  // Basic user profile data, never includes tokens/sensitive info
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

export const useUserStore = create(
  persist<UserState, [], [], Pick<UserState, 'user' | 'isAuthenticated'>>(
    set => ({
      user: null,
      isAuthenticated: false,
      setUser: user => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => AsyncStorageLib),
      version: 1,
      migrate: (persistedState, version) => {
        if (version < 1) {
          // example migration
          return {
            ...(persistedState as object),
            isAuthenticated: !!(persistedState as any)?.user,
          }
        }
        return persistedState as any
      },
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
