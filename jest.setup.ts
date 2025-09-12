import '@testing-library/jest-native/extend-expect'

jest.mock('react-native-reanimated', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('react-native-reanimated/mock')
)
jest.mock('react-native-gesture-handler', () => {
  const RNGH = jest.requireActual('react-native-gesture-handler/jestSetup')
  return RNGH
})
