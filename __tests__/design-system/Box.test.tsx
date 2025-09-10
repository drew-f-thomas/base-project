import React from 'react'
import { render } from '@testing-library/react-native'
import { Text as RNText } from 'react-native'
import { Box } from '@/src/design-system/components/Box'
import { ThemeProvider } from '@/src/design-system/ThemeProvider'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('Box', () => {
  it('renders children correctly', () => {
    const { getByText } = renderWithTheme(
      <Box>
        <RNText>Box content</RNText>
      </Box>
    )
    expect(getByText('Box content')).toBeTruthy()
  })

  it('applies padding from theme', () => {
    const { getByTestId } = renderWithTheme(
      <Box padding="md" testID="test-box">
        <RNText>Content</RNText>
      </Box>
    )
    const boxElement = getByTestId('test-box')
    expect(boxElement.props.style).toMatchObject(
      expect.objectContaining({
        padding: 16, // md spacing from theme
      })
    )
  })

  it('applies margin from theme', () => {
    const { getByTestId } = renderWithTheme(
      <Box margin="lg" testID="test-box">
        <RNText>Content</RNText>
      </Box>
    )
    const boxElement = getByTestId('test-box')
    expect(boxElement.props.style).toMatchObject(
      expect.objectContaining({
        margin: 24, // lg spacing from theme
      })
    )
  })

  it('applies padding variants correctly', () => {
    const { getByTestId } = renderWithTheme(
      <Box paddingHorizontal="sm" paddingVertical="lg" testID="test-box">
        <RNText>Content</RNText>
      </Box>
    )
    const boxElement = getByTestId('test-box')
    expect(boxElement.props.style).toMatchObject(
      expect.objectContaining({
        paddingHorizontal: 8, // sm spacing
        paddingVertical: 24, // lg spacing
      })
    )
  })

  it('applies margin variants correctly', () => {
    const { getByTestId } = renderWithTheme(
      <Box marginHorizontal="xs" marginVertical="xl" testID="test-box">
        <RNText>Content</RNText>
      </Box>
    )
    const boxElement = getByTestId('test-box')
    expect(boxElement.props.style).toMatchObject(
      expect.objectContaining({
        marginHorizontal: 4, // xs spacing
        marginVertical: 32, // xl spacing
      })
    )
  })

  it('applies border radius from theme', () => {
    const { getByTestId } = renderWithTheme(
      <Box borderRadius="lg" testID="test-box">
        <RNText>Content</RNText>
      </Box>
    )
    const boxElement = getByTestId('test-box')
    expect(boxElement.props.style).toMatchObject(
      expect.objectContaining({
        borderRadius: 12, // lg radius from theme
      })
    )
  })

  it('applies flex properties', () => {
    const { getByTestId } = renderWithTheme(
      <Box
        flex={1}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        testID="test-box"
      >
        <RNText>Content</RNText>
      </Box>
    )
    const boxElement = getByTestId('test-box')
    expect(boxElement.props.style).toMatchObject(
      expect.objectContaining({
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      })
    )
  })

  it('applies background color', () => {
    const { getByTestId } = renderWithTheme(
      <Box backgroundColor="#FF0000" testID="test-box">
        <RNText>Content</RNText>
      </Box>
    )
    const boxElement = getByTestId('test-box')
    expect(boxElement.props.style).toMatchObject(
      expect.objectContaining({
        backgroundColor: '#FF0000',
      })
    )
  })

  it('applies gap from theme', () => {
    const { getByTestId } = renderWithTheme(
      <Box gap="md" testID="test-box">
        <RNText>Content</RNText>
      </Box>
    )
    const boxElement = getByTestId('test-box')
    expect(boxElement.props.style).toMatchObject(
      expect.objectContaining({
        gap: 16, // md spacing
      })
    )
  })

  it('merges custom styles', () => {
    const customStyle = { opacity: 0.5, elevation: 2 }
    const { getByTestId } = renderWithTheme(
      <Box style={customStyle} testID="test-box">
        <RNText>Content</RNText>
      </Box>
    )
    const boxElement = getByTestId('test-box')
    expect(boxElement.props.style).toMatchObject(
      expect.objectContaining(customStyle)
    )
  })

  it('passes through other View props', () => {
    const { getByTestId } = renderWithTheme(
      <Box accessibilityLabel="Custom box" testID="test-box">
        <RNText>Content</RNText>
      </Box>
    )
    const boxElement = getByTestId('test-box')
    expect(boxElement.props.accessibilityLabel).toBe('Custom box')
  })
})
