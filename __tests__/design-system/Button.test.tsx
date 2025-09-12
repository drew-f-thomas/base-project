import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Button } from '@/src/design-system/components/Button'
import { ThemeProvider } from '@/src/design-system/ThemeProvider'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('Button', () => {
  it('renders correctly with text', () => {
    const { getByText } = renderWithTheme(<Button>Test Button</Button>)
    expect(getByText('Test Button')).toBeTruthy()
  })

  it('handles press events', () => {
    const onPress = jest.fn()
    const { getByText } = renderWithTheme(
      <Button onPress={onPress}>Click Me</Button>
    )

    fireEvent.press(getByText('Click Me'))
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    const { queryByText } = renderWithTheme(
      <Button loading testID="loading-button">
        Test Button
      </Button>
    )

    // Text should not be visible when loading
    expect(queryByText('Test Button')).toBeNull()
  })

  it('disables interaction when disabled', () => {
    const onPress = jest.fn()
    const { getByText } = renderWithTheme(
      <Button onPress={onPress} disabled>
        Disabled Button
      </Button>
    )

    fireEvent.press(getByText('Disabled Button'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('applies different variants correctly', () => {
    const variants = ['primary', 'secondary', 'ghost', 'link'] as const

    variants.forEach(variant => {
      const { getByRole } = renderWithTheme(
        <Button variant={variant}>Test {variant}</Button>
      )
      const button = getByRole('button')
      expect(button).toBeTruthy()
    })
  })
})
