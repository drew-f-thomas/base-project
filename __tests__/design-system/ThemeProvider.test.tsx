import React from 'react'
import { render, renderHook } from '@testing-library/react-native'
import { Text as RNText } from 'react-native'
import { ThemeProvider, useTheme } from '@/src/design-system/ThemeProvider'

// Mock only useColorScheme specifically
const mockUseColorScheme = jest.fn(() => 'light')
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: () => mockUseColorScheme(),
}))

describe('ThemeProvider', () => {
  beforeEach(() => {
    mockUseColorScheme.mockReturnValue('light')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('provides theme context to children', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current.theme).toBeDefined()
    expect(result.current.colorScheme).toBeDefined()
    expect(result.current.colors).toBeDefined()
  })

  it('uses system color scheme by default', () => {
    mockUseColorScheme.mockReturnValue('dark')

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current.colorScheme).toBe('dark')
    expect(result.current.colors).toBe(result.current.theme.colors.dark)
  })

  it('respects override color scheme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider colorScheme="dark">{children}</ThemeProvider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current.colorScheme).toBe('dark')
    expect(result.current.colors).toBe(result.current.theme.colors.dark)
  })

  it('falls back to light when system scheme is null', () => {
    mockUseColorScheme.mockReturnValue(null as any)

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current.colorScheme).toBe('light')
    expect(result.current.colors).toBe(result.current.theme.colors.light)
  })

  it('provides correct colors for light theme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider colorScheme="light">{children}</ThemeProvider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current.colors.primary).toBe('#007AFF')
    expect(result.current.colors.background).toBe('#FFFFFF')
    expect(result.current.colors.text).toBe('#000000')
  })

  it('provides correct colors for dark theme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider colorScheme="dark">{children}</ThemeProvider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current.colors.primary).toBe('#0A84FF')
    expect(result.current.colors.background).toBe('#000000')
    expect(result.current.colors.text).toBe('#FFFFFF')
  })

  it('renders children correctly', () => {
    const { getByText } = render(
      <ThemeProvider>
        <RNText>Theme provider test</RNText>
      </ThemeProvider>
    )
    expect(getByText('Theme provider test')).toBeTruthy()
  })
})

describe('useTheme hook', () => {
  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = jest.fn()

    expect(() => {
      renderHook(() => useTheme())
    }).toThrow('useTheme must be used within ThemeProvider')

    console.error = originalError
  })

  it('returns theme context when used within provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    )

    const { result } = renderHook(() => useTheme(), { wrapper })

    expect(result.current).toMatchObject({
      theme: expect.any(Object),
      colorScheme: expect.any(String),
      colors: expect.any(Object),
    })
  })
})
