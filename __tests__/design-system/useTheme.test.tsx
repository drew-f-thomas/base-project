import { renderHook } from '@testing-library/react-native'
import { ThemeProvider } from '@/src/design-system/ThemeProvider'
import { useTheme } from '@/src/design-system/hooks/useTheme'

describe('useTheme', () => {
  it('provides theme context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current.theme).toBeDefined()
    expect(result.current.colorScheme).toBeDefined()
    expect(result.current.colors).toBeDefined()
  })

  it('throws error when used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = jest.fn()

    expect(() => {
      renderHook(() => useTheme())
    }).toThrow('useTheme must be used within ThemeProvider')

    console.error = originalError
  })

  it('provides correct colors based on color scheme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider colorScheme="light">{children}</ThemeProvider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current.colorScheme).toBe('light')
    expect(result.current.colors).toBe(result.current.theme.colors.light)
  })
})
