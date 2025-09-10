import React from 'react'
import { render } from '@testing-library/react-native'
import { Text as RNText } from 'react-native'
import { Card } from '@/src/design-system/components/Card'
import { ThemeProvider } from '@/src/design-system/ThemeProvider'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('Card', () => {
  it('renders children correctly', () => {
    const { getByText } = renderWithTheme(
      <Card>
        <RNText>Card content</RNText>
      </Card>
    )
    expect(getByText('Card content')).toBeTruthy()
  })

  it('applies default elevated variant', () => {
    const { getByTestId } = renderWithTheme(
      <Card testID="test-card">
        <RNText>Content</RNText>
      </Card>
    )
    const cardElement = getByTestId('test-card')
    // Default variant should include shadow properties
    expect(cardElement.props.style).toMatchObject(
      expect.objectContaining({
        shadowColor: '#000',
        elevation: 3, // from theme.shadows.md
      })
    )
  })

  it('applies outlined variant correctly', () => {
    const { getByTestId } = renderWithTheme(
      <Card variant="outlined" testID="test-card">
        <RNText>Content</RNText>
      </Card>
    )
    const cardElement = getByTestId('test-card')
    expect(cardElement.props.style).toMatchObject(
      expect.objectContaining({
        borderWidth: 1,
      })
    )
  })

  it('applies filled variant correctly', () => {
    const { getByTestId } = renderWithTheme(
      <Card variant="filled" testID="test-card">
        <RNText>Content</RNText>
      </Card>
    )
    const cardElement = getByTestId('test-card')
    // Should use surface color from theme
    expect(cardElement.props.style).toMatchObject(
      expect.objectContaining({
        backgroundColor: '#F2F2F7', // light surface color
      })
    )
  })

  it('applies default padding and border radius', () => {
    const { getByTestId } = renderWithTheme(
      <Card testID="test-card">
        <RNText>Content</RNText>
      </Card>
    )
    const cardElement = getByTestId('test-card')
    expect(cardElement.props.style).toMatchObject(
      expect.objectContaining({
        padding: 16, // md padding
        borderRadius: 12, // lg radius
        overflow: 'hidden',
      })
    )
  })

  it('inherits Box props', () => {
    const { getByTestId } = renderWithTheme(
      <Card margin="lg" testID="test-card">
        <RNText>Content</RNText>
      </Card>
    )
    const cardElement = getByTestId('test-card')
    expect(cardElement.props.style).toMatchObject(
      expect.objectContaining({
        margin: 24, // lg margin
      })
    )
  })

  it('merges custom styles', () => {
    const customStyle = { opacity: 0.8, transform: [{ scale: 1.1 }] }
    const { getByTestId } = renderWithTheme(
      <Card style={customStyle} testID="test-card">
        <RNText>Content</RNText>
      </Card>
    )
    const cardElement = getByTestId('test-card')
    expect(cardElement.props.style).toMatchObject(
      expect.objectContaining({
        opacity: 0.8,
        transform: [{ scale: 1.1 }],
      })
    )
  })

  it('passes through accessibility props', () => {
    const { getByTestId } = renderWithTheme(
      <Card accessibilityLabel="Custom card" testID="test-card">
        <RNText>Content</RNText>
      </Card>
    )
    const cardElement = getByTestId('test-card')
    expect(cardElement.props.accessibilityLabel).toBe('Custom card')
  })

  it('respects theme colors in different color schemes', () => {
    const { getByTestId } = renderWithTheme(
      <Card variant="filled" testID="test-card">
        <RNText>Content</RNText>
      </Card>
    )
    const cardElement = getByTestId('test-card')
    // Should use the current theme's surface color
    expect(cardElement.props.style).toMatchObject(
      expect.objectContaining({
        backgroundColor: expect.any(String),
      })
    )
  })
})
