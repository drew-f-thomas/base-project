/**
 * Central theme configuration that combines all design tokens.
 * Provides a single source of truth for the app's design system.
 */

import { BorderRadius } from './BorderRadius';
import { Colors } from './Colors';
import { Shadows } from './Shadows';
import { Spacing } from './Spacing';
import { Typography } from './Typography';

export const Theme = {
  colors: Colors,
  spacing: Spacing,
  typography: Typography,
  borderRadius: BorderRadius,
  shadows: Shadows,
} as const;

// Re-export individual theme modules for convenience
export { BorderRadius, Colors, Shadows, Spacing, Typography };

// Theme type for TypeScript
export type Theme = typeof Theme;

// Color scheme type
export type ColorScheme = 'light' | 'dark';

// Utility function to get theme-aware colors
export const getThemeColors = (colorScheme: ColorScheme) => {
  return Theme.colors[colorScheme];
};

// Utility function to create consistent styles
export const createStyles = <T extends Record<string, any>>(styles: T): T =>
  styles;
