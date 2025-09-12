import { renderHook, act } from '@testing-library/react-native'
import { useColorMode } from '@/src/design-system/hooks/useColorMode'

// Mock only the specific modules we need
const mockUseColorScheme = jest.fn(() => 'light')
const mockSubscription = { remove: jest.fn() }
const mockAddChangeListener = jest.fn((_listener: any) => mockSubscription)

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: () => mockUseColorScheme(),
}))

jest.mock('react-native/Libraries/Utilities/Appearance', () => ({
  addChangeListener: mockAddChangeListener,
}))

describe('useColorMode', () => {
  beforeEach(() => {
    mockUseColorScheme.mockReturnValue('light')
    mockSubscription.remove.mockClear()
    mockAddChangeListener.mockClear()
    mockAddChangeListener.mockReturnValue(mockSubscription)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('initializes with system color scheme', () => {
    mockUseColorScheme.mockReturnValue('dark')

    const { result } = renderHook(() => useColorMode())

    expect(result.current.colorScheme).toBe('dark')
    expect(result.current.isDark).toBe(true)
    expect(result.current.isLight).toBe(false)
  })

  it('falls back to light when system scheme is null', () => {
    mockUseColorScheme.mockReturnValue(null as any)

    const { result } = renderHook(() => useColorMode())

    expect(result.current.colorScheme).toBe('light')
    expect(result.current.isLight).toBe(true)
    expect(result.current.isDark).toBe(false)
  })

  it('provides toggle function', () => {
    const { result } = renderHook(() => useColorMode())

    expect(typeof result.current.toggleColorScheme).toBe('function')
  })

  it('toggles from light to dark', () => {
    mockUseColorScheme.mockReturnValue('light')

    const { result } = renderHook(() => useColorMode())

    act(() => {
      result.current.toggleColorScheme()
    })

    expect(result.current.colorScheme).toBe('dark')
    expect(result.current.isDark).toBe(true)
    expect(result.current.isLight).toBe(false)
  })

  it('toggles from dark to light', () => {
    mockUseColorScheme.mockReturnValue('dark')

    const { result } = renderHook(() => useColorMode())

    // First toggle should go to light
    act(() => {
      result.current.toggleColorScheme()
    })

    expect(result.current.colorScheme).toBe('light')
    expect(result.current.isLight).toBe(true)
    expect(result.current.isDark).toBe(false)
  })

  it('sets up appearance change listener', () => {
    renderHook(() => useColorMode())

    expect(mockAddChangeListener).toHaveBeenCalledWith(expect.any(Function))
  })

  it('responds to system appearance changes', () => {
    let changeListener: (params: {
      colorScheme: 'light' | 'dark' | null
    }) => void

    mockAddChangeListener.mockImplementation((listener: any) => {
      changeListener = listener
      return mockSubscription
    })

    const { result } = renderHook(() => useColorMode())

    // Simulate system change to dark
    act(() => {
      changeListener({ colorScheme: 'dark' })
    })

    expect(result.current.colorScheme).toBe('dark')
    expect(result.current.isDark).toBe(true)
  })

  it('handles null color scheme from system change', () => {
    let changeListener: (params: {
      colorScheme: 'light' | 'dark' | null
    }) => void

    mockAddChangeListener.mockImplementation((listener: any) => {
      changeListener = listener
      return mockSubscription
    })

    const { result } = renderHook(() => useColorMode())

    // Simulate system change to null
    act(() => {
      changeListener({ colorScheme: null })
    })

    expect(result.current.colorScheme).toBe('light')
  })

  it('cleans up listener on unmount', () => {
    const { unmount } = renderHook(() => useColorMode())

    unmount()

    expect(mockSubscription.remove).toHaveBeenCalled()
  })

  it('provides correct boolean flags', () => {
    // Test light mode
    mockUseColorScheme.mockReturnValue('light')
    const { result: lightResult } = renderHook(() => useColorMode())

    expect(lightResult.current.isLight).toBe(true)
    expect(lightResult.current.isDark).toBe(false)

    // Test dark mode
    mockUseColorScheme.mockReturnValue('dark')
    const { result: darkResult } = renderHook(() => useColorMode())

    expect(darkResult.current.isLight).toBe(false)
    expect(darkResult.current.isDark).toBe(true)
  })
})
