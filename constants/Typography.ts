/**
 * Typography system for consistent text styling across the app.
 * Includes font families, sizes, weights, and line heights.
 */

export const Typography = {
  // Font families
  fontFamily: {
    regular: 'System', // Default system font
    medium: 'System',
    bold: 'System',
    mono: 'Courier New', // For code/monospace text
  },

  // Font sizes (following a modular scale)
  fontSize: {
    xs: 12, // Small captions
    sm: 14, // Body small
    md: 16, // Body regular
    lg: 18, // Body large
    xl: 20, // Heading small
    xxl: 24, // Heading medium
    xxxl: 32, // Heading large
    display: 40, // Display text
  },

  // Font weights
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },

  // Line heights (as multipliers of font size)
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Predefined text styles
  styles: {
    // Headings
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: 18,
      fontWeight: '500' as const,
      lineHeight: 1.4,
    },

    // Body text
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.4,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 1.6,
    },

    // UI text
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 1.2,
    },
    buttonSmall: {
      fontSize: 14,
      fontWeight: '600' as const,
      lineHeight: 1.2,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 1.3,
    },
    label: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 1.3,
    },

    // Special text
    code: {
      fontFamily: 'Courier New',
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.4,
    },
    link: {
      fontSize: 16,
      fontWeight: '500' as const,
      lineHeight: 1.4,
      textDecorationLine: 'underline' as const,
    },
  },
} as const;

export type TypographyKey = keyof typeof Typography;
export type FontSizeKey = keyof typeof Typography.fontSize;
export type FontWeightKey = keyof typeof Typography.fontWeight;
export type TextStyleKey = keyof typeof Typography.styles;
