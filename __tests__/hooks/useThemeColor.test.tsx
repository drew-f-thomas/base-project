import { useThemeColor } from '@/hooks/useThemeColor';
import { renderHook } from '@testing-library/react-native';

// Mock the useColorScheme hook
jest.mock('@/hooks/useColorScheme', () => ({
  useColorScheme: jest.fn(() => 'light'),
}));

describe('useThemeColor Hook', () => {
  beforeEach(() => {
    // Reset mock to default light mode
    const { useColorScheme } = require('@/hooks/useColorScheme');
    useColorScheme.mockReturnValue('light');
  });

  it('returns light color when color scheme is light', () => {
    const { result } = renderHook(() =>
      useThemeColor({ light: '#000000', dark: '#ffffff' }, 'text')
    );

    expect(result.current).toBe('#000000');
  });

  it('returns dark color when color scheme is dark', () => {
    // Mock dark color scheme
    const { useColorScheme } = require('@/hooks/useColorScheme');
    useColorScheme.mockReturnValue('dark');

    const { result } = renderHook(() =>
      useThemeColor({ light: '#000000', dark: '#ffffff' }, 'text')
    );

    expect(result.current).toBe('#ffffff');
  });

  it('returns theme color when no custom colors provided', () => {
    const { result } = renderHook(() => useThemeColor({}, 'text'));

    // Should return the theme's text color
    expect(result.current).toBeDefined();
  });

  it('returns custom light color when provided', () => {
    const { result } = renderHook(() =>
      useThemeColor({ light: '#ff0000' }, 'text')
    );

    expect(result.current).toBe('#ff0000');
  });

  it('returns custom dark color when provided', () => {
    // Mock dark color scheme
    const { useColorScheme } = require('@/hooks/useColorScheme');
    useColorScheme.mockReturnValue('dark');

    const { result } = renderHook(() =>
      useThemeColor({ dark: '#00ff00' }, 'text')
    );

    expect(result.current).toBe('#00ff00');
  });

  it('handles different color names', () => {
    const { result: textResult } = renderHook(() => useThemeColor({}, 'text'));
    const { result: backgroundResult } = renderHook(() =>
      useThemeColor({}, 'background')
    );
    const { result: tintResult } = renderHook(() => useThemeColor({}, 'tint'));

    expect(textResult.current).toBeDefined();
    expect(backgroundResult.current).toBeDefined();
    expect(tintResult.current).toBeDefined();
  });
});
