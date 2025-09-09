import { useTheme } from '@/hooks/useTheme';
import { renderHook } from '@testing-library/react-native';

// Mock the useColorScheme hook
jest.mock('@/hooks/useColorScheme', () => ({
  useColorScheme: jest.fn(() => 'light'),
}));

describe('useTheme Hook', () => {
  it('returns theme object with all required properties', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current).toHaveProperty('colors');
    expect(result.current).toHaveProperty('spacing');
    expect(result.current).toHaveProperty('typography');
    expect(result.current).toHaveProperty('borderRadius');
    expect(result.current).toHaveProperty('shadows');
    expect(result.current).toHaveProperty('colorScheme');
  });

  it('returns light theme colors by default', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.colors).toHaveProperty('text');
    expect(result.current.colors).toHaveProperty('background');
    expect(result.current.colors).toHaveProperty('tint');
    expect(result.current.colors).toHaveProperty('icon');
    expect(result.current.colors).toHaveProperty('tabIconDefault');
    expect(result.current.colors).toHaveProperty('tabIconSelected');
  });

  it('returns spacing object with all required properties', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.spacing).toHaveProperty('xs');
    expect(result.current.spacing).toHaveProperty('sm');
    expect(result.current.spacing).toHaveProperty('md');
    expect(result.current.spacing).toHaveProperty('lg');
    expect(result.current.spacing).toHaveProperty('xl');
    expect(result.current.spacing).toHaveProperty('xxl');
    expect(result.current.spacing).toHaveProperty('xxxl');
  });

  it('returns typography object with styles', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.typography).toHaveProperty('styles');
    expect(result.current.typography.styles).toHaveProperty('body');
    expect(result.current.typography.styles).toHaveProperty('h1');
    expect(result.current.typography.styles).toHaveProperty('h2');
    expect(result.current.typography.styles).toHaveProperty('h3');
    expect(result.current.typography.styles).toHaveProperty('h4');
  });

  it('returns borderRadius object with all required properties', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.borderRadius).toHaveProperty('sm');
    expect(result.current.borderRadius).toHaveProperty('md');
    expect(result.current.borderRadius).toHaveProperty('lg');
    expect(result.current.borderRadius).toHaveProperty('xl');
  });

  it('returns shadows object with all required properties', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.shadows).toHaveProperty('card');
    expect(result.current.shadows).toHaveProperty('button');
    expect(result.current.shadows).toHaveProperty('modal');
  });

  it('returns correct color scheme', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.colorScheme).toBe('light');
  });
});
