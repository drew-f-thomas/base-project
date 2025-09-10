import React, { createContext, useContext, ReactNode } from 'react'
import { useColorScheme as useRNColorScheme } from 'react-native'
import { theme, ColorScheme, ThemeColors } from './theme'

interface ThemeContextValue {
  theme: typeof theme
  colorScheme: ColorScheme
  colors: ThemeColors
  toggleColorScheme?: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  colorScheme?: ColorScheme
  toggleColorScheme?: () => void
}

export function ThemeProvider({
  children,
  colorScheme: overrideColorScheme,
  toggleColorScheme,
}: ThemeProviderProps) {
  const systemColorScheme = useRNColorScheme()
  const colorScheme = overrideColorScheme || systemColorScheme || 'light'
  const colors = theme.colors[colorScheme]

  const value: ThemeContextValue = {
    theme,
    colorScheme,
    colors,
    toggleColorScheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
