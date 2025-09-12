import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react'
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
  const [internalScheme, setInternalScheme] = useState<ColorScheme>(
    systemColorScheme || 'light'
  )
  // Follow system when no override is provided
  useEffect(() => {
    if (!overrideColorScheme) {
      setInternalScheme(systemColorScheme || 'light')
    }
  }, [systemColorScheme, overrideColorScheme])

  const colorScheme = overrideColorScheme ?? internalScheme
  const colors = theme.colors[colorScheme]
  const defaultToggle = () => {
    setInternalScheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const value: ThemeContextValue = {
    theme,
    colorScheme,
    colors,
    toggleColorScheme: toggleColorScheme ?? defaultToggle,
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
