/**
 * Spacing values used throughout the app for consistent margins, paddings, and gaps.
 * Based on an 8px grid system for optimal visual rhythm.
 */

export const Spacing = {
  // Base spacing units (8px grid)
  xs: 4, // 0.25rem
  sm: 8, // 0.5rem
  md: 16, // 1rem
  lg: 24, // 1.5rem
  xl: 32, // 2rem
  xxl: 48, // 3rem
  xxxl: 64, // 4rem

  // Semantic spacing
  screen: {
    horizontal: 16, // Screen horizontal padding
    vertical: 24, // Screen vertical padding
  },

  // Component specific
  card: {
    padding: 16,
    margin: 8,
    gap: 12,
  },

  button: {
    padding: 12,
    margin: 8,
    gap: 8,
  },

  input: {
    padding: 12,
    margin: 8,
  },

  // Layout spacing
  section: {
    margin: 24,
    gap: 16,
  },

  // Navigation
  tabBar: {
    height: 60,
    padding: 8,
  },

  header: {
    height: 44,
    padding: 16,
  },
} as const;

export type SpacingKey = keyof typeof Spacing;
