import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-native-reanimated'

import { ThemeProvider, useTheme } from '@/src/design-system/ThemeProvider'
import { validateEnvironment } from '@/src/config/env'
import { ErrorBoundary } from '@/src/design-system/components/ErrorBoundary'

// Validate environment on app start
if (__DEV__) {
  try {
    validateEnvironment()
  } catch (error) {
    console.warn('Environment validation failed:', error)
  }
}

// Reenable after updating .env with correct DSN
//
// import * as Sentry from '@sentry/react-native'
// import * as Application from 'expo-application'
// import * as Device from 'expo-device'
// import { loadEnv } from '@/src/config/env'
//
// const { SENTRY_DSN } = loadEnv()
// Sentry.init({
//   dsn: SENTRY_DSN || '',
//   tracesSampleRate: __DEV__ ? 1 : 0.2,
//   profilesSampleRate: __DEV__ ? 1 : 0.2,
// })
// Sentry.setContext('app', {
//   appName: Application.applicationName,
//   appVersion: Application.nativeApplicationVersion,
//   appBuild: Application.nativeBuildVersion,
// })
// Sentry.setContext('device', {
//   brand: Device.brand,
//   modelName: Device.modelName,
//   osName: Device.osName,
//   osVersion: Device.osVersion,
// })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useTheme()

  return (
    <NavigationThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {children}
    </NavigationThemeProvider>
  )
}

function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <NavigationWrapper>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </NavigationWrapper>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  )
}

export default RootLayout
// export default Sentry.wrap(RootLayout)
