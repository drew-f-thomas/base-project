import { create } from 'zustand'
import { User } from '@/src/lib/api/schemas'

interface UserState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  isAuthenticated: false,
  setUser: user => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))

// Selector hooks for better performance
export const useUser = () => useUserStore(state => state.user)
export const useIsAuthenticated = () =>
  useUserStore(state => state.isAuthenticated)
export const useSetUser = () => useUserStore(state => state.setUser)
export const useLogout = () => useUserStore(state => state.logout)
