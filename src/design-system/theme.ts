/**
 * Central theme configuration with typed tokens
 * Single source of truth for the design system
 */

export const theme = {
  colors: {
    light: {
      primary: '#007AFF',
      secondary: '#5856D6',
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      background: '#FFFFFF',
      surface: '#F2F2F7',
      text: '#000000',
      textSecondary: '#3C3C43',
      textTertiary: '#C7C7CC',
      border: '#C6C6C8',
      disabled: '#8E8E93',
      link: '#0a7ea4',
    },
    dark: {
      primary: '#0A84FF',
      secondary: '#5E5CE6',
      success: '#30D158',
      warning: '#FF9F0A',
      error: '#FF453A',
      background: '#000000',
      surface: '#1C1C1E',
      text: '#FFFFFF',
      textSecondary: '#EBEBF5',
      textTertiary: '#48484A',
      border: '#38383A',
      disabled: '#636366',
      link: '#0a7ea4',
    },
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  radii: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
      display: 40,
    },
    weights: {
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
    lineHeights: {
      tight: 1.1,
      normal: 1.5,
      relaxed: 1.7,
    },
    fonts: {
      body: 'System',
      heading: 'System',
      mono: 'SpaceMono',
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
} as const

export type Theme = typeof theme
export type ColorScheme = 'light' | 'dark'
export type ThemeColors = typeof theme.colors.light | typeof theme.colors.dark
