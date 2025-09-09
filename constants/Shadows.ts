/**
 * Shadow definitions for consistent elevation and depth throughout the app.
 * Platform-specific shadow implementations for iOS and Android.
 */

import { Platform } from 'react-native';

export const Shadows = {
  // Elevation levels
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
  }),

  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),

  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
  }),

  xl: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
    },
    android: {
      elevation: 16,
    },
  }),

  // Component specific shadows
  card: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
  }),

  button: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
  }),

  modal: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
    },
    android: {
      elevation: 12,
    },
  }),

  // Special effects
  glow: Platform.select({
    ios: {
      shadowColor: '#007AFF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
      // Note: Android doesn't support colored shadows easily
    },
  }),
} as const;

export type ShadowKey = keyof typeof Shadows;
