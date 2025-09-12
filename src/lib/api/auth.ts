import * as SecureStore from 'expo-secure-store'

const TOKEN_KEY = 'auth.accessToken'
const REFRESH_KEY = 'auth.refreshToken'

export async function getAccessToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY)
}
export async function setAccessToken(token: string): Promise<void> {
  return SecureStore.setItemAsync(TOKEN_KEY, token)
}
export async function clearTokens(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY)
  await SecureStore.deleteItemAsync(REFRESH_KEY)
}

export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(REFRESH_KEY)
}
export async function setRefreshToken(token: string): Promise<void> {
  return SecureStore.setItemAsync(REFRESH_KEY, token)
}
export async function clearRefreshToken(): Promise<void> {
  await SecureStore.deleteItemAsync(REFRESH_KEY)
}
