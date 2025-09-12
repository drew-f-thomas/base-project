import { useState, useEffect } from 'react'
import { useColorScheme as useRNColorScheme, Appearance } from 'react-native'
import { ColorScheme } from '../theme'

export function useColorMode() {
  const systemColorScheme = useRNColorScheme()
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    systemColorScheme || 'light'
  )

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme || 'light')
    })

    return () => subscription?.remove()
  }, [])

  const toggleColorScheme = () => {
    setColorScheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return {
    colorScheme,
    toggleColorScheme,
    isLight: colorScheme === 'light',
    isDark: colorScheme === 'dark',
  }
}
