/**
 * Border radius values for consistent rounded corners throughout the app.
 * Based on a 4px scale for visual harmony.
 */

export const BorderRadius = {
  // Base radius values
  none: 0,
  xs: 2, // Very subtle rounding
  sm: 4, // Small rounding
  md: 8, // Medium rounding
  lg: 12, // Large rounding
  xl: 16, // Extra large rounding
  xxl: 24, // Very large rounding
  full: 9999, // Fully rounded (pills, circles)

  // Component specific
  button: {
    small: 4,
    medium: 8,
    large: 12,
  },

  card: {
    small: 8,
    medium: 12,
    large: 16,
  },

  input: {
    small: 4,
    medium: 8,
    large: 12,
  },

  // Special cases
  modal: 16,
  tab: 8,
  badge: 12,
  avatar: 9999, // Always circular
} as const;

export type BorderRadiusKey = keyof typeof BorderRadius;
