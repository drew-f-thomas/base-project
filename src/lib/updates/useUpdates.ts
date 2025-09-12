import * as Updates from 'expo-updates'
import { useCallback } from 'react'

export function useUpdateCheck() {
  return useCallback(async () => {
    try {
      const res = await Updates.checkForUpdateAsync()
      if (res.isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    } catch (e) {
      if (__DEV__) console.warn('Update check failed', e)
    }
  }, [])
}
