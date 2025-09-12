import { ExpoConfig, ConfigContext } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'base-project',
  slug: 'base-project',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'base-project',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    bundleIdentifier: 'com.base-project.mobile',
    supportsTablet: true,
  },
  android: {
    package: 'com.base-project.mobile',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      '@sentry/react-native/expo',
      {
        url: 'https://sentry.io/',
        project: 'YOUR_PROJECT',
        organization: 'YOUR_ORG',
        // SENTRY_AUTH_TOKEN must come from env
      },
    ],
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    // Runtime environment variables
    EXPO_PUBLIC_API_URL:
      process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
    SENTRY_DSN: process.env.SENTRY_DSN,
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  },
})
